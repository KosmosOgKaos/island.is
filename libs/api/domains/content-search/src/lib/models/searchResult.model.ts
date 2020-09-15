import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Article } from 'libs/api/domains/cms/src/lib/models/article.model'
import { LifeEventPage } from 'libs/api/domains/cms/src/lib/models/lifeEventPage.model'

import { ContentItem } from './contentItem.model'

@ObjectType()
export class SearchResult {
  @Field(() => Int)
  total: number

  // TODO: Change this to slices of all indexed types
  @Field(() => [Article, LifeEventPage])
  items: (typeof Article | typeof LifeEventPage)[]
}
