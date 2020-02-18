import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CurrencyInput from './CurrencyInput'

describe('<CurrencyInput />', () => {
  it('renders passed value and base', () => {
    const { getByDisplayValue } = render(
      <CurrencyInput value={12331} base="EUR" baseOptions={['RUB', 'EUR']} />,
    )

    expect(getByDisplayValue('12331')).toBeTruthy()
    expect(getByDisplayValue('EUR')).toBeTruthy()
  })

  it('fires onChange callbacks', () => {
    const onValueChangeMock = jest.fn()
    const onBaseChangeMock = jest.fn()
    const { getByTestId } = render(
      <CurrencyInput
        value={1}
        base="USD"
        baseOptions={['RUB', 'USD']}
        onValueChange={onValueChangeMock}
        onBaseChange={onBaseChangeMock}
      />,
    )
    const input = getByTestId('currency-input-input')
    const select = getByTestId('currency-input-select')

    fireEvent.change(input, { target: { value: 215 } })
    fireEvent.change(select, { target: { value: 'RUB' } })

    expect(onValueChangeMock).toHaveBeenCalledWith(215)
    expect(onBaseChangeMock).toHaveBeenCalledWith('RUB')
  })
})
