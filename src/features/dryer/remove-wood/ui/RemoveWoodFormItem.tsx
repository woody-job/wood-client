import { FC, useMemo, useState } from 'react'
import { Control, FieldErrors, useFieldArray, UseFormRegister, UseFormWatch } from 'react-hook-form'

import { Box, Button, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'

import { DryerRemoveFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'
import { useFetchDimensionsByWoodClassQuery, getDimensionString } from '@/entities/dimension'
import { skipToken } from '@reduxjs/toolkit/query'
import { WoodType } from '@/entities/wood-type'

type RemoveWoodFormItemProps = {
  field: Record<'id', string>
  fieldIndex: number
  register: UseFormRegister<DryerRemoveFormType>
  control: Control<DryerRemoveFormType>
  errors: FieldErrors<DryerRemoveFormType>
  isWoodClassesLoading: boolean
  woodClasses: WoodClass[] | undefined
  watch: UseFormWatch<DryerRemoveFormType>
  woodTypes: WoodType[] | undefined
  isWoodTypesLoading: boolean
}

export const RemoveWoodFormItem: FC<RemoveWoodFormItemProps> = ({
  field,
  fieldIndex,
  register,
  control,
  errors,
  isWoodClassesLoading,
  woodTypes,
  isWoodTypesLoading,
  woodClasses,
  watch,
}) => {
  const watchWoodClassId = watch(`woods.${fieldIndex}.woodClassId`)
  const watchWoodTypeId = watch(`woods.${fieldIndex}.woodTypeId`)
  const watchDimensionId = watch(`woods.${fieldIndex}.dimensionId`)
  const watchAmount = watch(`woods.${fieldIndex}.amount`)

  const [initialFieldAmount] = useState(watch(`woods.${fieldIndex}.amount`))

  const {
    fields: nestedFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `woods.${fieldIndex}.modifiedWoods`,
  })

  const { data: dimensions, isLoading: isDimensionsLoading } = useFetchDimensionsByWoodClassQuery(
    watchWoodClassId ?? skipToken,
    {
      skip: !open,
    }
  )
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

  const woodClassesOptions = useMemo(() => {
    if (!woodClasses) {
      return []
    }

    return woodClasses.map(woodClass => ({ id: woodClass.id, label: woodClass.name }))
  }, [woodClasses])

  const woodTypesOptions = useMemo(() => {
    if (!woodTypes) {
      return []
    }

    return woodTypes.map(woodType => ({ id: woodType.id, label: woodType.name }))
  }, [woodTypes])

  const handleAppendNested = () => {
    append({
      dimensionId: watchDimensionId,
      woodTypeId: watchWoodTypeId,
      amount: undefined,
      woodClassId: undefined,
      dryerChamberDataRecordId: undefined,
    })
  }

  const formElements = (
    <Box>
      {isDimensionsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          name={`woods.${fieldIndex}.dimensionId`}
          control={control}
          options={dimensionsOptions}
          placeholder={'Сечение'}
          disabled
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
          disabled
          rules={{
            required: 'Порода обязательна',
          }}
        />
      )}

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
        helperText={
          watchAmount !== initialFieldAmount || nestedFields.length
            ? `Изначальное количество: ${initialFieldAmount}`
            : ``
        }
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

  const nestedFormElements = nestedFields.map((_, index) => {
    return (
      <Box>
        <Grid item container gap={3}>
          <Grid item flexGrow={0}>
            {isDimensionsLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormAutocomplete
                name={`woods.${fieldIndex}.modifiedWoods.${index}.dimensionId`}
                control={control}
                options={dimensionsOptions}
                placeholder={'Сечение'}
                disabled
                rules={{
                  required: 'Сечение обязательно',
                }}
              />
            )}

            {isWoodTypesLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormAutocomplete
                name={`woods.${fieldIndex}.modifiedWoods.${index}.woodTypeId`}
                control={control}
                options={woodTypesOptions}
                placeholder={'Порода'}
                disabled
                rules={{
                  required: 'Порода обязательна',
                }}
              />
            )}

            {isWoodClassesLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormAutocomplete
                name={`woods.${fieldIndex}.modifiedWoods.${index}.woodClassId`}
                control={control}
                options={woodClassesOptions}
                placeholder={'Сорт'}
                rules={{
                  required: 'Сорт обязателен',
                }}
              />
            )}

            <Box maxWidth={243}>
              <TextField
                label='Количество'
                variant='outlined'
                type='number'
                inputProps={{
                  ...register(`woods.${fieldIndex}.modifiedWoods.${index}.amount` as const, {
                    required: true,
                    valueAsNumber: true,
                  }),
                }}
              />
              {errors?.woods?.[fieldIndex]?.modifiedWoods?.[index]?.amount?.type === 'required' && (
                <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
                  Количество обязательно
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item alignSelf='center'>
            <Button variant='gray' onClick={() => remove(index)} sx={{ mt: 2, width: '100%' }}>
              Убрать
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3 }} />
      </Box>
    )
  })

  const addButtonDisabled = Boolean(
    initialFieldAmount && watchAmount && initialFieldAmount <= watchAmount
  )

  return (
    <>
      <Grid container flexDirection='row' spacing={2} key={field.id}>
        <Grid item flex={'0 0 100%'}>
          {formElements}

          <Divider sx={{ mt: 3 }} />
        </Grid>

        <Grid item container>
          {nestedFormElements}
        </Grid>

        <Box sx={{ width: '100%', mr: 2 }} title={addButtonDisabled ? 'Измените количество' : ''}>
          <Button
            variant='gray'
            onClick={handleAppendNested}
            sx={{ mt: nestedFields.length === 0 ? 0 : 3, ml: 2, width: '100%' }}
            disabled={addButtonDisabled}
          >
            Добавить измененную доску
          </Button>
        </Box>
      </Grid>
      <Divider sx={{ my: 5 }} />
    </>
  )
}
