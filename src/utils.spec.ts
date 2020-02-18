import { convert } from './utils'

describe('utils', () => {
  describe('convert()', () => {
    it('returns the same value for empty rates', () => {
      expect(convert(331, 'RUB', 'USD')).toBe(331)
      expect(convert(123, 'RUB', 'USD', { 
        base: 'RUB',
        rates: {
          EUR: 2
        }
       })).toBe(123)
       expect(convert(1234, 'RUB', 'USD', { 
        base: 'RUB',
        rates: {
          USD: 1.5
        }
       })).toBe(1234)
    })

    it('return value according to rates', () => {
      expect(convert(123, 'RUB', 'USD', { 
        base: 'RUB',
        rates: {
          RUB: 1,
          USD: 2
        }
       })).toBe(246)

       expect(convert(100, 'USD', 'EUR', { 
        base: 'RUB',
        rates: {
          RUB: 1,
          USD: 2,
          EUR: 3,
        }
       })).toBe(150)
    })
  })
})