import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import App from './App'
import * as API from './api'

const rate = {
  base: 'USD',
  rates: {
    USD: 1,
    RUB: 65,
    EUR: 1.4,
    FZK: 5,
  },
}

describe('<App />', () => {
  let mockApi: jest.SpyInstance<Promise<API.Rate>, [(string | undefined)?]>

  beforeAll(() => {
    mockApi = jest.spyOn(API, 'getExchangeRate')

    mockApi.mockImplementation(() => {
      return Promise.resolve(rate)
    })
  })

  afterAll(() => {
    mockApi.mockRestore()
  })

  it('calculates new value', async () => {
    const { getAllByTestId, getByText } = render(<App />)
    await wait()
    const input = getAllByTestId('currency-input-input')[0]

    fireEvent.change(input, { target: { value: '12' } })

    expect(getByText(/12/)).toBeInTheDocument()
    expect(getByText(/780/)).toBeInTheDocument()
  })
})
