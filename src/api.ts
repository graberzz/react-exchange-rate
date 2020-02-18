import axios from 'axios'

export interface Rate {
  rates: Record<string, number>
  base: string
  date?: string
}
export const getExchangeRate = async (base?: string): Promise<Rate> => {
  const { data } = await axios.get(
    `https://api.exchangeratesapi.io/latest${base ? `?base=${base}` : ''}`,
  )

  return data
}

export const getBaseList = async (): Promise<string[]> => {
  const rate = await getExchangeRate('USD')

  return Object.keys(rate.rates)
}

export interface Range {
  start: string
  end: string
}

export type RateHistory = Record<string, Record<string, number>>

export const getExchangeRateHistory = async (
  range: Range,
  ...symbols: string[]
): Promise<RateHistory> => {
  const { data } = await axios.get(
    `https://api.exchangeratesapi.io/history?start_at=${range.start}&end_at=${
      range.end
    }&symbols=${symbols.join(',')}&base=USD`,
  )

  return data.rates
}
