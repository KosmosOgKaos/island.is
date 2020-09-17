import {
  DataProvider,
  DataProviderTypes,
  SuccessfulDataProviderResult,
} from '@island.is/application/template'

export class ParentalLeaveSalary extends DataProvider {
  readonly type: DataProviderTypes.ParentalLeaveSalary

  onProvideSuccess(_: unknown): SuccessfulDataProviderResult {
    return {
      date: new Date(),
      data: 1000000,
      status: 'success',
    }
  }

  provide(): Promise<unknown> {
    return Promise.resolve()
  }
}
