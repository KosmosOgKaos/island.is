import { ApiProperty } from '@nestjs/swagger'

import { ThjodskraUser } from '@island.is/air-discount-scheme/types'
import { NationalRegistryResponse } from './user.types'

export class User implements ThjodskraUser {
  constructor(user: NationalRegistryResponse, flightLegsLeft: number) {
    this.firstName = user.firstName
    this.middleName = user.middleName
    this.lastName = user.lastName
    this.gender = user.gender
    this.nationalId = user.nationalId
    this.flightLegsLeft = flightLegsLeft
  }

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  gender: string

  @ApiProperty()
  nationalId: string

  @ApiProperty()
  flightLegsLeft: number
}
