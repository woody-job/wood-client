import { FC } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

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
import { DryerBringInFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'

type InsertWoodFormItemProps = {
  field: Record<'id', string>
  fieldIndex: number
  watch: UseFormWatch<DryerBringInFormType>
  register: UseFormRegister<DryerBringInFormType>
  control: Control<DryerBringInFormType>
  errors: FieldErrors<DryerBringInFormType>
  remove: UseFieldArrayRemove
  isWoodClassesLoading: boolean
  isWoodTypesLoading: boolean
  woodClasses: WoodClass[] | undefined
  woodTypes: WoodType[] | undefined
}

export const InsertWoodFormItem: FC<InsertWoodFormItemProps> = ({
  field,
  fieldIndex,
  watch,
  register,
  control,
  remove,
  errors,
  isWoodClassesLoading,
  isWoodTypesLoading,
  woodClasses,
  woodTypes,
}) => {
  const watchWoodClassId = watch(`woods.${fieldIndex}.woodClassId`)

  const { data: dimensions, isLoading: isDimensionsLoading } = useFetchDimensionsByWoodClassQuery(
    watchWoodClassId ?? skipToken,
    {
      skip: !open,
    }
  )

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
          Порода обязательна
        </Typography>
      )}

      {isDimensionsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Controller
          name={`woods.${fieldIndex}.dimensionId`}
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextField select label='Сечение' value={value} onChange={onChange}>
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
            )
          }}
        />
      )}
      {errors?.woods?.[fieldIndex]?.dimensionId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Сечение обязательно
        </Typography>
      )}

      {isWoodTypesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Controller
          name={`woods.${fieldIndex}.woodTypeId`}
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextField select label='Порода' value={value} onChange={onChange}>
                {woodTypes?.map(woodType => (
                  <MenuItem key={woodType.id} value={woodType.id}>
                    {woodType.name}
                  </MenuItem>
                ))}
              </TextField>
            )
          }}
        />
      )}
      {errors?.woods?.[fieldIndex]?.woodTypeId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Порода обязательна
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
          Количество не может быть пустым
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
      <Divider sx={{ my: 5 }} />
    </>
  )
}
