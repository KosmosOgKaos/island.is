import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Client } from './client.model'

@Table({
  tableName: 'client_allowed_scope',
  indexes: [
    {
      fields: ['client_id'],
    },
  ],
})
export class ClientAllowedScope extends Model<ClientAllowedScope> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  scopeName: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ForeignKey(() => Client)
  @ApiProperty()
  clientId: string
}
