import { Field, ObjectType } from '@nestjs/graphql'

import { IFrontpageSlider } from '../generated/contentfulTypes'
import { Image, mapImage } from './image.model'

@ObjectType()
export class FrontpageSlider {
  @Field()
  title: string

  @Field()
  subtitle: string

  @Field()
  content: string

  @Field({ nullable: true })
  image?: Image

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  animationJson?: string
}

export const mapFrontpageSlider = ({
  fields,
}: IFrontpageSlider): FrontpageSlider => ({
  title: fields.title,
  subtitle: fields.subtitle,
  content: fields.content,
  image: mapImage(fields.image),
  link: fields.link && JSON.stringify(fields.link),
  animationJson: fields.animationJson
    ? JSON.stringify(fields.animationJson)
    : '',
})
