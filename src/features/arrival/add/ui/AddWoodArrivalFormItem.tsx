import { FC } from 'react'
import { FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormWatch } from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

import { getDimensionString, useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { ArrivalFormType } from '@/entities/wood-arrival'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'

type AddWoodArrivalFormItemProps = {
  field: Record<'id', string>
  fieldIndex: number
  watch: UseFormWatch<ArrivalFormType>
  register: UseFormRegister<ArrivalFormType>
  errors: FieldErrors<ArrivalFormType>
  remove: UseFieldArrayRemove
  woodClasses?: WoodClass[]
  isWoodClassesLoading: boolean
  woodTypes?: WoodType[]
  isWoodTypesLoading: boolean
}

export const AddWoodArrivalFormItem: FC<AddWoodArrivalFormItemProps> = ({
  field,
  fieldIndex,
  watch,
  register,
  remove,
  errors,
  woodClasses,
  isWoodClassesLoading,
  woodTypes,
  isWoodTypesLoading,
}) => {
  const watchWoodClassId = watch(`woodArrivalItems.${fieldIndex}.woodClassId`)

  const { data: dimensions, isLoading: isDimensionsLoading } = useFetchDimensionsByWoodClassQuery(
    watchWoodClassId ?? skipToken
  )

  const formElements = (
    <Box>
      {isWoodClassesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextField
          select
          label='Сорт'
          inputProps={{
            ...register(`woodArrivalItems.${fieldIndex}.woodClassId`, { required: true }),
          }}
        >
          {woodClasses?.map(woodClass => (
            <MenuItem key={woodClass.id} value={woodClass.id}>
              {woodClass.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {errors?.woodArrivalItems?.[fieldIndex]?.woodClassId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Порода обязательна
        </Typography>
      )}

      {isDimensionsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextField
          select
          label='Сечение'
          inputProps={{
            ...register(`woodArrivalItems.${fieldIndex}.dimensionId`, { required: true }),
          }}
        >
          {watchWoodClassId ? (
            dimensions?.map(dimension => (
              <MenuItem key={dimension.id} value={dimension.id}>
                {getDimensionString(dimension)}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Выберите сорт</MenuItem>
          )}
        </TextField>
      )}
      {errors?.woodArrivalItems?.[fieldIndex]?.dimensionId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Сечение обязательно
        </Typography>
      )}

      {isWoodTypesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextField
          select
          label='Порода'
          inputProps={{
            ...register(`woodArrivalItems.${fieldIndex}.woodTypeId`, { required: true }),
          }}
        >
          {woodTypes?.map(woodType => (
            <MenuItem key={woodType.id} value={woodType.id}>
              {woodType.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {errors?.woodArrivalItems?.[fieldIndex]?.woodTypeId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Порода обязательна
        </Typography>
      )}

      <TextField
        label='Количество'
        variant='outlined'
        type='number'
        inputProps={{
          // Для предотвращения изменения значения поля при скролле
          onWheel: e => e.currentTarget.blur(),

          ...register(`woodArrivalItems.${fieldIndex}.amount`, {
            required: true,
            valueAsNumber: true,
          }),
        }}
      />
      {errors?.woodArrivalItems?.[fieldIndex]?.amount?.type === 'required' && (
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
        <Grid item flexGrow={1}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'grid',
              alignItems: 'center',
            }}
          >
            <Button variant='outlined' onClick={() => remove(fieldIndex)}>
              Удалить
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 5, mb: 3, width: '100%' }} />
    </>
  )
}
