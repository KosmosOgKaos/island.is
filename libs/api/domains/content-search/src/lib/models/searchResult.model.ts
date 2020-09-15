import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-express'

import { IArticle } from 'libs/api/domains/cms/src/lib/generated/contentfulTypes'
import {
  Article,
  // mapArticle,
} from 'libs/api/domains/cms/src/lib/models/article.model'
import {
  LifeEventPage,
  mapLifeEventPage,
} from 'libs/api/domains/cms/src/lib/models/lifeEventPage.model'

import { ContentItem } from './contentItem.model'

const Items = createUnionType({
  name: 'Items',
  types: () => [Article],
})

type ItemsTypes = Article

export const mapArticle = (hit: any): Article => {
  console.log('-fields', hit)

  return {
    id: hit.id,
    contentStatus: hit.contentStatus,
    title: hit.title,
    shortTitle: hit.shortTitle ?? '',
    slug: hit.slug,
    content: (hit.content && JSON.stringify(hit.content)) ?? null,
    category: hit.category?.fields,
    group: hit.group?.fields,
    subgroup: hit.subgroup?.fields,
    organization: null,
    relatedArticles: null,
    subArticles: null,
  }
}

export const mapItems = (
  hit: ItemsTypes,
  contentType: string,
): typeof Items => {
  switch (contentType) {
    case 'article':
      console.log('-hit', hit)
      return mapArticle(hit as any)

    // case 'lifeEventPage':
    //   return mapLifeEventPage({ sys: { id: hit.id }, fields: hit } as any)

    default:
      return null
  }
}

@ObjectType()
export class SearchResult {
  @Field(() => Int)
  total: number

  @Field(() => [Items], { nullable: true })
  itemsNew: Array<typeof Items>

  @Field(() => [ContentItem])
  items: Array<ContentItem>
}
