import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form'

import { Box, Typography } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

interface FormAutocompleteProps<
  O extends { id: number | string; label: string },
  TField extends FieldValues,
> {
  control: Control<TField>
  name: Path<TField>
  options: O[]
  placeholder?: string
  rules?:
    | Omit<
        RegisterOptions<TField, Path<TField>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  groupBy?: ((option: O) => string) | undefined
  disabled?: boolean
  skipError?: boolean
  sanitizeRussianX?: boolean
}

export const FormAutocomplete = <
  O extends { id: number | string; label: string },
  TField extends FieldValues,
>(
  props: FormAutocompleteProps<O, TField>
) => {
  const {
    control,
    options,
    name,
    rules,
    groupBy,
    disabled,
    skipError,
    sanitizeRussianX = true,
  } = props

  const filterOptions = createFilterOptions<O>({
    stringify: (option: O) => {
      const sanitizedValue = option.label.replace(new RegExp('x', 'g'), 'х')

      return `${sanitizedValue} ${option.label}`
    },
  })

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field

        return (
          <Box>
            <Autocomplete
              groupBy={groupBy}
              value={
                value
                  ? options.find(option => {
                      return value === option.id
                    }) ?? null
                  : null
              }
              getOptionLabel={option => {
                return option.label
              }}
              onChange={(_: any, newValue) => {
                onChange(newValue ? newValue.id : null)
              }}
              disabled={disabled}
              // id="controllable-states-demo"
              filterOptions={sanitizeRussianX ? filterOptions : undefined}
              options={options}
              renderInput={params => (
                <TextField
                  {...params}
                  disabled={disabled}
                  label={props.placeholder}
                  inputRef={ref}
                />
              )}
            />
            {error && !skipError ? (
              <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
                {error.message}
              </Typography>
            ) : null}
          </Box>
        )
      }}
    />
  )
}
