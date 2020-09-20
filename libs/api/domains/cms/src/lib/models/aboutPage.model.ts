import { Field, ID, ObjectType } from '@nestjs/graphql'

import * as types from '../generated/contentfulTypes'

import { Slice, mapSlice } from './slice.model'

@ObjectType()
export class AboutPage {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field()
  seoDescription: string

  @Field()
  theme: string

  @Field(() => [Slice])
  slices: Array<typeof Slice>
}

export const mapAboutPage = ({ fields, sys }: types.IPage): AboutPage => ({
  id: sys.id,
  slices: fields.slices.map(mapSlice),
  title: fields.title,
  theme: fields.theme.toLowerCase(),
  seoDescription: fields.seoDescription ?? '',
})
