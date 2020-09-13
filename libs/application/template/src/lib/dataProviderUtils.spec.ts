import { callDataProviders } from './dataProviderUtils'
import { DataProvider, DataProviderTypes } from '../types/DataProvider'

class ExampleProviderThatAlwaysFails extends DataProvider {
  readonly type: DataProviderTypes.ExampleFails

  provide(): Promise<unknown> {
    return Promise.reject('this should reject')
  }
}

class ExampleProviderThatAlwaysSucceeds extends DataProvider {
  readonly type: DataProviderTypes.ExampleSucceeds

  provide(): Promise<string> {
    return Promise.resolve('success')
  }
}

describe('dataProviderUtils', () => {
  it('should return results in place', async () => {
    const dataProviders = [
      new ExampleProviderThatAlwaysSucceeds(),
      new ExampleProviderThatAlwaysSucceeds(),
    ]
    const result = await callDataProviders(dataProviders, undefined)
    expect(result).toEqual([
      expect.objectContaining({
        data: true,
        status: 'success',
      }),
      expect.objectContaining({
        data: true,
        status: 'success',
      }),
    ])
  })
  it('should not fail although only one data provider fails, but still return all data provider results, in place', async () => {
    const dataProviders = [
      new ExampleProviderThatAlwaysSucceeds(),
      new ExampleProviderThatAlwaysFails(),
      new ExampleProviderThatAlwaysSucceeds(),
    ]
    const result = await callDataProviders(dataProviders, undefined)
    expect(result).toEqual([
      expect.objectContaining({
        data: true,
        status: 'success',
      }),
      expect.objectContaining({
        status: 'failure',
      }),
      expect.objectContaining({
        data: true,
        status: 'success',
      }),
    ])
  })
})
