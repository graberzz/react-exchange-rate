import React from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { Box } from '@material-ui/core'

interface CurrencyInputProps {
  value: number
  onValueChange?(value: number): void
  base: string
  baseOptions: string[]
  onBaseChange?(base: string): void
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onValueChange,
  base,
  baseOptions,
  onBaseChange,
}) => {
  function handleValueChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onValueChange && onValueChange(+evt.target.value)
  }

  function handleBaseChange(evt: React.ChangeEvent<{ value: unknown }>) {
    onBaseChange && onBaseChange(evt.target.value as string)
  }

  return (
    <Box display="flex">
      <Box mr={2}>
        <TextField
          inputProps={{
            min: 0,
            'data-testid': 'currency-input-input',
          }}
          type="number"
          variant="outlined"
          value={value}
          onChange={handleValueChange}
        />
      </Box>
      <Select
        inputProps={{
          'data-testid': 'currency-input-select',
        }}
        variant="outlined"
        native
        value={base}
        onChange={handleBaseChange}
      >
        {baseOptions.map(base => (
          <option key={base} value={base}>
            {base}
          </option>
        ))}
      </Select>
    </Box>
  )
}

export default CurrencyInput
