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

import {
  Dimension,
  getDimensionString,
  useFetchDimensionsByWoodClassQuery,
} from '@/entities/dimension'
import { WoodClass } from '@/entities/wood-class'
import { ShipmentFormType } from '@/entities/wood-shipment'
import { WoodType } from '@/entities/wood-type'
import { getUniqueDimensionsFromAllDimensions } from '@/shared/libs/helpers'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'

type AddWoodShipmentFormItemProps = {
  field: Record<'id', string>
  fieldIndex: number
  control: Control<ShipmentFormType, any>
  watch: UseFormWatch<ShipmentFormType>
  register: UseFormRegister<ShipmentFormType>
  errors: FieldErrors<ShipmentFormType>
  remove: UseFieldArrayRemove
  woodClasses?: WoodClass[]
  isWoodClassesLoading: boolean
  woodTypes?: WoodType[]
  allDimensions?: Dimension[]
  isWoodTypesLoading: boolean
}

export const AddWoodShipmentFormItem: FC<AddWoodShipmentFormItemProps> = ({
  field,
  fieldIndex,
  control,
  watch,
  register,
  remove,
  errors,
  woodClasses,
  isWoodClassesLoading,
  woodTypes,
  isWoodTypesLoading,
  allDimensions,
}) => {
  const watchWoodClassId = watch(`woodShipmentItems.${fieldIndex}.woodClassId`)

  const { data: dimensions, isLoading: isDimensionsLoading } = useFetchDimensionsByWoodClassQuery(
    watchWoodClassId ?? skipToken
  )

  const dimensionForSaleOptions = useMemo(() => {
    if (!allDimensions) {
      return []
    }

    return getUniqueDimensionsFromAllDimensions(allDimensions)
  }, [allDimensions])

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
          name={`woodShipmentItems.${fieldIndex}.woodClassId`}
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
          name={`woodShipmentItems.${fieldIndex}.dimensionId`}
          control={control}
          options={dimensionsOptions}
          placeholder={'Сечение'}
          rules={{
            required: 'Сечение обязательно',
          }}
        />
      )}

      {isDimensionsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          groupBy={option => option.width}
          name={`woodShipmentItems.${fieldIndex}.dimensionForSaleId`}
          control={control}
          options={dimensionForSaleOptions}
          placeholder={'Сечение для продажи'}
        />
      )}

      {isWoodTypesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          name={`woodShipmentItems.${fieldIndex}.woodTypeId`}
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
        inputProps={{
          // Для предотвращения изменения значения поля при скролле
          onWheel: e => e.currentTarget.blur(),

          ...register(`woodShipmentItems.${fieldIndex}.amount`, {
            required: true,
            valueAsNumber: true,
          }),
        }}
      />
      {errors?.woodShipmentItems?.[fieldIndex]?.amount?.type === 'required' && (
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
