import { FC, useMemo } from 'react'
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

import {
  Dimension,
  getDimensionString,
  useFetchDimensionsByWoodClassQuery,
} from '@/entities/dimension'
import { WoodClass } from '@/entities/wood-class'
import { ShipmentFormType } from '@/entities/wood-shipment'
import { WoodType } from '@/entities/wood-type'
import { getUniqueDimensionsFromAllDimensions } from '@/shared/libs/helpers'

type AddWoodShipmentFormItemProps = {
  field: Record<'id', string>
  fieldIndex: number
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

  const formElements = (
    <Box>
      {isWoodClassesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextField
          select
          label='Сорт'
          inputProps={{
            ...register(`woodShipmentItems.${fieldIndex}.woodClassId`, { required: true }),
          }}
        >
          {woodClasses?.map(woodClass => (
            <MenuItem key={woodClass.id} value={woodClass.id}>
              {woodClass.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {errors?.woodShipmentItems?.[fieldIndex]?.woodClassId?.type === 'required' && (
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
            ...register(`woodShipmentItems.${fieldIndex}.dimensionId`, { required: true }),
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
      {errors?.woodShipmentItems?.[fieldIndex]?.dimensionId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Сечение обязательно
        </Typography>
      )}

      {isDimensionsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextField
          select
          label='Сечение для продажи'
          inputProps={{ ...register(`woodShipmentItems.${fieldIndex}.dimensionForSaleId`) }}
        >
          {dimensionForSaleOptions?.map(dimension => (
            <MenuItem key={dimension.id} value={dimension.id}>
              {dimension.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      {isWoodTypesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextField
          select
          label='Порода'
          inputProps={{
            ...register(`woodShipmentItems.${fieldIndex}.woodTypeId`, { required: true }),
          }}
        >
          {woodTypes?.map(woodType => (
            <MenuItem key={woodType.id} value={woodType.id}>
              {woodType.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {errors?.woodShipmentItems?.[fieldIndex]?.woodTypeId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Порода обязательна
        </Typography>
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
