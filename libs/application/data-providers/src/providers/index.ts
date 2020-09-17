import { ExpectedDateOfBirth } from './ExpectedDateOfBirth'
import { ExampleSucceeds } from './ExampleSucceeds'
import { ParentalLeaveSalary } from './ParentalLeaveSalary'
import {
  DataProvider,
  DataProviderTypes,
} from '@island.is/application/template'

const typeMap = {
  [DataProviderTypes.ExpectedDateOfBirth]: ExpectedDateOfBirth,
  [DataProviderTypes.ExampleSucceeds]: ExampleSucceeds,
  [DataProviderTypes.ParentalLeaveSalary]: ParentalLeaveSalary,
}

export function getDataProviderByType(
  type: DataProviderTypes,
  constructorParams: unknown,
): DataProvider | null {
  const Provider = typeMap[type]
  if (Provider) {
    return new Provider(constructorParams)
  }
  return null
}
