

import { Rate } from './api'

export function convert(value: number, from: string, to: string, rate?: Rate): number {
  if (!rate?.rates[to] || !rate?.rates[from]) return value
  return +((rate?.rates[to] / rate?.rates[from]) * value).toFixed(2)
}