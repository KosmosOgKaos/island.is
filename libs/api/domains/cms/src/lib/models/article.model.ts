import { Field, ObjectType, ID } from '@nestjs/graphql'

import { IArticle } from '../generated/contentfulTypes'

import { ArticleCategory } from './articleCategory.model'
import { ArticleGroup } from './articleGroup.model'
import { ArticleSubgroup } from './articleSubgroup.model'
import { Organization, mapOrganization } from './organization.model'
import { SubArticle, mapSubArticle } from './subArticle.model'

@ObjectType()
export class Article {
  constructor(initializer: Article) {
    Object.assign(this, initializer)
  }

  @Field(() => ID)
  id: string

  @Field()
  contentStatus: string

  @Field()
  title: string

  @Field({ nullable: true })
  shortTitle?: string

  @Field()
  slug: string

  @Field({ nullable: true })
  content?: string

  @Field(() => ArticleCategory, { nullable: true })
  category?: ArticleCategory

  @Field(() => ArticleGroup, { nullable: true })
  group?: ArticleGroup

  @Field(() => ArticleSubgroup, { nullable: true })
  subgroup?: ArticleSubgroup

  @Field(() => [Organization])
  organization?: Array<Organization>

  @Field(() => [Article])
  relatedArticles?: Array<Article>

  @Field(() => [SubArticle])
  subArticles?: Array<SubArticle>
}

export const mapArticle = ({ fields, sys }: IArticle): Article => {
  console.log('-fields', fields)
  console.log('-sys', sys)

  return {
    id: sys.id,
    contentStatus: fields.contentStatus,
    title: fields.title,
    shortTitle: fields.shortTitle ?? '',
    slug: fields.slug,
    content: (fields.content && JSON.stringify(fields.content)) ?? null,
    category: fields.category?.fields,
    group: fields.group?.fields,
    subgroup: fields.subgroup?.fields,
    organization: (fields.organization ?? []).map(mapOrganization),
    relatedArticles: (fields.relatedArticles ?? []).map(mapArticle),
    subArticles: (fields.subArticles ?? []).map(mapSubArticle),
  }
}
