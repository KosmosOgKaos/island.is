import { MappedData } from '@island.is/api/content-search'
import { logger } from '@island.is/logging'
import { Injectable } from '@nestjs/common'
import { INews } from '../../generated/contentfulTypes'
import { News, mapNews } from '../../models/news.model'
import { createTerms, extractStringsFromObject } from './utils'

@Injectable()
export class NewsSyncService {
  processSyncData(items) {
    logger.info('Processing sync data for news')

    return items.filter((item) => item.sys.contentType.sys.id === 'news')
  }

  doMapping(entries: INews[]): MappedData[] {
    logger.info('Mapping news', { count: entries.length })
    return entries
      .map<MappedData | boolean>((entry) => {
        let mapped: News
        try {
          mapped = mapNews(entry)

          return {
            _id: mapped.id,
            title: mapped.title,
            content: extractStringsFromObject(JSON.parse(mapped.content)),
            type: 'webNews',
            termPool: createTerms([mapped.title, mapped.intro]),
            response: JSON.stringify(mapped),
            tags: [
              {
                key: mapped.slug,
                type: 'slug',
              },
            ],
            dateCreated: mapped.date,
            dateUpdated: new Date().getTime().toString(),
          }
        } catch (error) {
          logger.error('Failed to import news', error)
          return false
        }
      })
      .filter((value): value is MappedData => Boolean(value))
  }
}
