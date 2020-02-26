import React, { useState, useEffect } from 'react'
import { Card, Box, CircularProgress } from '@material-ui/core'
import CurrencyInput from './components/CurrencyInput'
import CurrencyChart from './components/CurrencyChart'
import { getExchangeRate, Rate } from './api'
import { convert } from './utils'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState(1)
  const [base, setBase] = useState('USD')

  const [baseFrom, setBaseFrom] = useState('USD')
  const [baseTo, setBaseTo] = useState('RUB')

  const [rate, setRate] = useState<Rate>()
  useEffect(() => {
    async function fetchRate() {
      const rate = await getExchangeRate('USD')

      setRate(rate)
      setIsLoading(false)
    }

    fetchRate()
  }, [])

  const baseOptions = Object.keys(rate?.rates ?? {})

  const valueTo = baseTo === base ? value : convert(value, base, baseTo, rate)
  const valueFrom =
    baseFrom === base ? value : convert(value, base, baseFrom, rate)

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      {isLoading ? (
        <CircularProgress size={80} />
      ) : (
        <Card variant="outlined" style={{ display: 'inline-block' }}>
          <Box display="flex" flexWrap="wrap" justifyContent="center" p={2}>
            <Box mr={2} mb={2}>
              {valueFrom} {baseFrom} equals
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>
                {valueTo} {baseTo}
              </div>
              <Box mb={2}>
                <CurrencyInput
                  value={valueFrom}
                  onValueChange={value => {
                    setValue(value)
                    setBase(baseFrom)
                  }}
                  base={baseFrom}
                  onBaseChange={setBaseFrom}
                  baseOptions={baseOptions}
                />
              </Box>
              <CurrencyInput
                value={valueTo}
                onValueChange={value => {
                  setValue(value)
                  // setBase(baseTo)
                }}
                base={baseTo}
                onBaseChange={setBaseTo}
                baseOptions={baseOptions}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <CurrencyChart baseFrom={baseFrom} baseTo={baseTo} />
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  )
}

export default App
