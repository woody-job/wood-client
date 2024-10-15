import { FC } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'

import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

import { DryerRemoveFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'

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
  const formElements = (
    <Box>
      {isWoodClassesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Controller
          name={`woods.${fieldIndex}.woodClassId`}
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextField select label='Сорт' value={value} onChange={onChange}>
                {woodClasses?.map(woodClass => (
                  <MenuItem key={woodClass.id} value={woodClass.id}>
                    {woodClass.name}
                  </MenuItem>
                ))}
              </TextField>
            )
          }}
        />
      )}
      {errors?.woods?.[fieldIndex]?.woodClassId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Сорт обязателен
        </Typography>
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
