import { Field, ObjectType, ID } from '@nestjs/graphql'

import { Fund } from './fund.model'
import { Flight } from '../../flight'
import { Role } from '../../auth'

@ObjectType()
export class User {
  @Field((_1) => ID)
  nationalId: string

  @Field()
  name: string

  @Field({ nullable: true })
  mobile?: string

  @Field(() => String, { defaultValue: 'user' })
  role?: Role

  @Field(() => Fund, { nullable: true })
  fund?: Fund

  @Field(() => Boolean, { defaultValue: false })
  meetsADSRequirements?: boolean

  @Field(() => [Flight], { nullable: true })
  flights?: Flight[]
}
