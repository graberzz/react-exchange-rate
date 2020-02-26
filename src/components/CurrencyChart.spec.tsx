import React from 'react'
import { render, wait, fireEvent } from '@testing-library/react'
import CurrencyChart, { transformRateHistory } from './CurrencyChart'
import * as API from '../api'

jest.mock('@devexpress/dx-react-chart-material-ui')

const rateHistory = {
  '2020-02-14': { RUB: 63.5598598045, USD: 1.0 },
  '2020-02-13': { RUB: 63.5142173553, USD: 1.0 },
  '2020-02-17': { RUB: 63.4567604984, USD: 1.0 },
}

describe('<CurrencyChart />', () => {
  let mockApi: jest.SpyInstance<
    Promise<Record<string, Record<string, number>>>,
    [API.Range, ...string[]]
  >

  beforeAll(() => {
    mockApi = jest.spyOn(API, 'getExchangeRateHistory')

    mockApi.mockImplementation(() => {
      return Promise.resolve(rateHistory)
    })
  })

  afterAll(() => {
    mockApi.mockRestore()
  })

  it('fetches new chart data on button click', async () => {
    const { getByText } = render(<CurrencyChart baseFrom="RUB" baseTo="EUR" />)
    const button1M = getByText('1M')

    fireEvent.click(button1M)
    await wait()

    expect(mockApi).toHaveBeenCalledTimes(2)

    const button1Y = getByText('1Y')

    fireEvent.click(button1Y)
    await wait()

    expect(mockApi).toHaveBeenCalledTimes(3)
  })
})

test('rates to chart data transformation', () => {
  expect(transformRateHistory(rateHistory)).toStrictEqual([
    { date: '2020-02-14', value: 63.5598598045 },
    { date: '2020-02-13', value: 63.5142173553 },
    { date: '2020-02-17', value: 63.4567604984 },
  ])
})
