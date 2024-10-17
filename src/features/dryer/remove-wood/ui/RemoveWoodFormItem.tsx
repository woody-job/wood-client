import { FC, useMemo } from 'react'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

import { Box, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'

import { DryerRemoveFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'

type RemoveWoodFormItemProps = {
  field: Record<'id', string>
  fieldIndex: number
  register: UseFormRegister<DryerRemoveFormType>
  control: Control<DryerRemoveFormType>
  errors: FieldErrors<DryerRemoveFormType>
  isWoodClassesLoading: boolean
  woodClasses: WoodClass[] | undefined
}

export const RemoveWoodFormItem: FC<RemoveWoodFormItemProps> = ({
  field,
  fieldIndex,
  register,
  control,
  errors,
  isWoodClassesLoading,
  woodClasses,
}) => {
  const woodClassesOptions = useMemo(() => {
    if (!woodClasses) {
      return []
    }

    return woodClasses.map(woodClass => ({ id: woodClass.id, label: woodClass.name }))
  }, [woodClasses])

  const formElements = (
    <Box>
      {isWoodClassesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          name={`woods.${fieldIndex}.woodClassId`}
          control={control}
          options={woodClassesOptions}
          placeholder={'Сорт'}
          rules={{
            required: 'Сорт обязателен',
          }}
        />
      )}

      <TextField
        label='Количество'
        variant='outlined'
        type='number'
        inputProps={{
          ...register(`woods.${fieldIndex}.amount` as const, {
            required: true,
            valueAsNumber: true,
          }),
        }}
      />
      {errors?.woods?.[fieldIndex]?.amount?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Количество обязательно
        </Typography>
      )}
    </Box>
  )

  return (
    <>
      <Grid container flexDirection='row' spacing={2} key={field.id}>
        <Grid item flex={'0 0 70%'}>
          {formElements}
        </Grid>
      </Grid>
      <Divider sx={{ my: 5 }} />
    </>
  )
}
