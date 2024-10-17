import { FC, useMemo } from 'react'
import {
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Button, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'

import { getDimensionString, useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { DryerBringInFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'

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

  const woodClassesOptions = useMemo(() => {
    if (!woodClasses) {
      return []
    }

    return woodClasses.map(woodClass => ({ id: woodClass.id, label: woodClass.name }))
  }, [woodClasses])

  const dimensionsOptions = useMemo(() => {
    if (!dimensions) {
      return []
    }

    return dimensions.map(dimension => ({
      id: dimension.id,
      label: getDimensionString(dimension),
      width: `${dimension.width}`,
    }))
  }, [dimensions])

  const woodTypesOptions = useMemo(() => {
    if (!woodTypes) {
      return []
    }

    return woodTypes.map(woodType => ({ id: woodType.id, label: woodType.name }))
  }, [woodTypes])

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

      {isDimensionsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          groupBy={option => option.width}
          name={`woods.${fieldIndex}.dimensionId`}
          control={control}
          options={dimensionsOptions}
          placeholder={'Сечение'}
          rules={{
            required: 'Сечение обязательно',
          }}
        />
      )}

      {isWoodTypesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          name={`woods.${fieldIndex}.woodTypeId`}
          control={control}
          options={woodTypesOptions}
          placeholder={'Порода'}
          rules={{
            required: 'Порода обязательна',
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
