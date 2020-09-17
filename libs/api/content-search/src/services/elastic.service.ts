import { Client } from '@elastic/elasticsearch'
import { MappedData, SearchIndexes, SearchResponse } from '../types'
import { logger } from '@island.is/logging'
import merge from 'lodash/merge'
import { environment } from '../environments/environment'
import * as AWS from 'aws-sdk'
import * as AwsConnector from 'aws-elasticsearch-connector'
import { Injectable } from '@nestjs/common'
import {
  SearcherInput,
  WebSearchAutocompleteInput,
} from '@island.is/api/schema'
import {
  autocompleteTermQuery,
  AutocompleteTermResponse,
} from '../queries/autocomplete'
import { searchQuery } from '../queries/search'
import {
  DocumentByMetaDataInput,
  documentByMetaDataQuery,
} from '../queries/documentByMetaData'

const { elastic } = environment
interface SyncRequest {
  add: MappedData[]
  remove: string[]
}
@Injectable()
export class ElasticService {
  private client: Client
  constructor() {
    logger.debug('Created ES Service')
  }

  async index(index: SearchIndexes, { _id, ...body }: MappedData) {
    try {
      const client = await this.getClient()
      return await client.index({
        id: _id,
        index: index,
        body,
      })
    } catch (error) {
      logger.error('Elastic request failed on index', error)
      throw error
    }
  }

  async bulk(index: SearchIndexes, documents: SyncRequest) {
    logger.info('Processing documents', {
      index,
      added: documents.add.length,
      removed: documents.remove.length,
    })

    const requests = []
    // if we have any documents to add add them to the request
    if (documents.add.length) {
      documents.add.forEach(({ _id, ...document }) => {
        requests.push({
          index: { _index: index, _id },
        })
        requests.push(document)
        return requests
      })
    }

    // if we have any documents to remove add them to the request
    if (documents.remove.length) {
      documents.remove.forEach((_id) => {
        requests.push({
          delete: { _index: index, _id },
        })
      })
    }

    // if we have any requests execute them
    if (requests.length) {
      try {
        const client = await this.getClient()
        const response = await client.bulk({
          index: index,
          body: requests,
        })
        // TODO: ES errors while indexing might not throw, but appear in response log those errors here
        return true
      } catch (error) {
        logger.error('Elastic request failed on bulk index', error)
        throw error
      }
    } else {
      logger.info('No requests to execute')
    }
    return false
  }

  async findByQuery<ResponseBody, RequestBody>(
    index: SearchIndexes,
    query: RequestBody,
  ) {
    try {
      const client = await this.getClient()
      return client.search<ResponseBody, RequestBody>({
        body: query,
        index,
      })
    } catch (e) {
      ElasticService.handleError(
        'Error in ElasticService.findByQuery',
        { query, index },
        e,
      )
    }
  }

  async getDocumentsByMetaData(
    index: SearchIndexes,
    query: DocumentByMetaDataInput,
  ) {
    const requestBody = documentByMetaDataQuery(query)
    const data = await this.findByQuery<
      SearchResponse<MappedData>,
      typeof requestBody
    >(index, requestBody)
    return data.body
  }

  async search(index: SearchIndexes, query: SearcherInput) {
    const { queryString, size, page, types } = query

    const requestBody = searchQuery({ queryString, size, page, types })
    const data = await this.findByQuery<
      SearchResponse<MappedData>,
      typeof requestBody
    >(index, requestBody)
    return data
  }

  async fetchAutocompleteTerm(
    index: SearchIndexes,
    input: Omit<WebSearchAutocompleteInput, 'language'>,
  ): Promise<AutocompleteTermResponse> {
    const { singleTerm: prefix, size } = input
    const requestBody = autocompleteTermQuery({ prefix, size })

    const data = await this.findByQuery<
      AutocompleteTermResponse,
      typeof requestBody
    >(index, requestBody)

    return data.body
  }

  async deleteByIds(index: SearchIndexes, ids: Array<string>) {
    // In case we get an empty list, ES will match that to all records... which we don't want to delete
    if (!ids.length) {
      return
    }
    const client = await this.getClient()
    return client.delete_by_query({
      index: index,
      body: {
        query: {
          bool: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            must: ids.map((id) => ({ match: { _id: id } })),
          },
        },
      },
    })
  }

  async deleteAllExcept(index: SearchIndexes, excludeIds: Array<string>) {
    const client = await this.getClient()

    return client.delete_by_query({
      index: index,
      body: {
        query: {
          bool: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            must_not: excludeIds.map((id) => ({ match: { _id: id } })),
          },
        },
      },
    })
  }

  async ping() {
    const client = await this.getClient()
    const result = await client.ping().catch((error) => {
      ElasticService.handleError('Error in ping', {}, error)
    })
    logger.info('Got elasticsearch ping response')
    return result
  }

  async getClient(): Promise<Client> {
    if (this.client) {
      return this.client
    }
    this.client = await this.createEsClient()
    return this.client
  }

  async createEsClient(): Promise<Client> {
    const hasAWS =
      'AWS_WEB_IDENTITY_TOKEN_FILE' in process.env ||
      'AWS_SECRET_ACCESS_KEY' in process.env

    logger.info('Create AWS ES Client', {
      esConfig: elastic,
      withAWS: hasAWS,
    })

    if (!hasAWS) {
      return new Client({
        node: elastic.node,
      })
    }

    return new Client({
      ...AwsConnector(AWS.config),
      node: elastic.node,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handleError(message: string, context: any, error: any) {
    ElasticService.logError(message, context, error)
    throw new Error(message)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static logError(message: string, context: any, error: any) {
    const errorCtx = {
      error: {
        message: error.message,
        reason: error.error?.meta?.body?.error?.reason,
        status: error.error?.meta?.body?.status,
        statusCode: error.error?.meta?.statusCode,
      },
    }

    logger.error(message, merge(context, errorCtx))
  }
}

// TODO: This service needs to include only generic functions anything specific to cms search should belong there
