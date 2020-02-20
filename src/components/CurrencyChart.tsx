import React, { useReducer, useState, useEffect } from 'react'
import { Paper, Box, Button, CircularProgress } from '@material-ui/core'
import {
  ValueAxis,
  Chart,
  LineSeries,
  ZoomAndPan,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui'
import { EventTracker } from '@devexpress/dx-react-chart'
import { DateTime } from 'luxon'
import { getExchangeRateHistory, RateHistory } from '../api'

interface ChartData {
  date: string
  value: number
}
export function transformRateHistory(rateHistory: RateHistory): ChartData[] {
  return Object.entries(rateHistory).map(([date, symbols], i) => {
    const value = Object.values(symbols)[0]
    return { date, value }
  })
}

interface CurrencyChartProps {
  baseFrom: string
  baseTo: string
}
const CurrencyChart: React.FC<CurrencyChartProps> = ({ baseFrom, baseTo }) => {
  interface State {
    start: string
    end: string
  }

  const format = 'yyyy-MM-dd'
  const initialState: State = {
    start: DateTime.local()
      .minus({ days: 5 })
      .toFormat(format),
    end: DateTime.local().toFormat(format),
  }

  function reducer(state = initialState, action: any): State {
    const now = DateTime.local()

    switch (action.type) {
      case 'UPDATE_CHART_5D':
        return {
          ...state,
          start: now.minus({ days: 5 }).toFormat(format),
        }
      case 'UPDATE_CHART_1M':
        return {
          ...state,
          start: now.minus({ months: 1 }).toFormat(format),
        }
      case 'UPDATE_CHART_1Y':
        return {
          ...state,
          start: now.minus({ years: 1 }).toFormat(format),
        }
    }

    return state
  }
  const [range, dispatch] = useReducer(reducer, initialState)

  const [chartData, setChartData] = useState<ChartData[]>()

  useEffect(() => {
    async function fetchHistory() {
      const rateHistory = await getExchangeRateHistory(range, baseFrom, baseTo)
      setChartData(transformRateHistory(rateHistory))
    }

    fetchHistory()
  }, [range, baseFrom, baseTo])

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button onClick={() => dispatch({ type: 'UPDATE_CHART_5D' })}>
          5D
        </Button>
        <Button onClick={() => dispatch({ type: 'UPDATE_CHART_1M' })}>
          1M
        </Button>
        <Button onClick={() => dispatch({ type: 'UPDATE_CHART_1Y' })}>
          1Y
        </Button>
      </Box>

      <Paper>
        <Box
          width={300}
          height={200}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {chartData ? (
            <Chart data={chartData} width={300} height={200}>
              <ValueAxis />

              <LineSeries argumentField="date" valueField="value" />
              <ZoomAndPan />
              <EventTracker />
              <Tooltip />
            </Chart>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Paper>
    </>
  )
}

export default CurrencyChart
