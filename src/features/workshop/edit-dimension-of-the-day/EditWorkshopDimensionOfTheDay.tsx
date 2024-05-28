import { FC, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Box, Button, Grid, MenuItem, TextField } from '@mui/material'

import { getDimensionString, useFetchAllDimensionsQuery } from '@/entities/dimension'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { enqueueSnackbar } from 'notistack'
import {
  UpdateWorkshopDailyDimensionParams,
  useUpdateWorkshopDailyDimensionMutation,
} from '@/entities/workshop'
import { useOutsideClick } from '@/shared/libs/hooks/click-outside'

export interface EditWorkshopDimensionOfTheDayProps {
  workshopId: number
  dimensionOfTheDay: string | undefined | null
  date: string
}

export const EditWorkshopDimensionOfTheDay: FC<EditWorkshopDimensionOfTheDayProps> = ({
  workshopId,
  dimensionOfTheDay,
  date,
}) => {
  const [isEdit, setEdit] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
  } = useForm<{ dimension: string | null | undefined }>({
    defaultValues: { dimension: dimensionOfTheDay },
  })

  const watchDimension = watch('dimension')

  const { data: allDimensions } = useFetchAllDimensionsQuery()

  const [updatWorkshopDailyDimensionMutation] = useUpdateWorkshopDailyDimensionMutation()

  useEffect(() => {
    setValue('dimension', dimensionOfTheDay)
  }, [dimensionOfTheDay])

  const dimensionsOptions = useMemo(() => {
    if (!allDimensions) {
      return []
    }

    let uniqueDimensionNamesOptions: {
      id: number
      name: string
    }[] = []

    const allDimensionsWithDuplicates = allDimensions.map(dimension => {
      return {
        id: dimension.id,
        name: getDimensionString(dimension),
      }
    })

    allDimensionsWithDuplicates.forEach(dimensionOption => {
      const existentDimensionOption = uniqueDimensionNamesOptions.find(
        option => option.name === dimensionOption.name
      )

      if (!existentDimensionOption) {
        uniqueDimensionNamesOptions.push(dimensionOption)
      }
    })

    return uniqueDimensionNamesOptions
  }, [allDimensions])

  const handleNewDimensionOfTheDay = (dimensionString: typeof dimensionOfTheDay) => {
    const dimensionId = dimensionsOptions.find(option => option.name === dimensionString)?.id

    if (!dimensionId) {
      return
    }

    const body: UpdateWorkshopDailyDimensionParams = {
      workshopId,
      dimensionId,
      date,
    }

    updatWorkshopDailyDimensionMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Сечение дня успешно изменено', { variant: 'success' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const editInputWrapperRef = useOutsideClick(() => {
    if (isEdit) {
      setEdit(false)
      reset({ dimension: dimensionOfTheDay })
    }
  })

  const handleSave = handleSubmit(data => {
    handleNewDimensionOfTheDay(data.dimension)
  })

  const handleButtonClick = (isEditing: boolean) => {
    if (isEditing) {
      handleSave()
    }

    if (errors.dimension) {
      return
    }

    setEdit((prev: boolean) => !prev)
  }

  const buttonText = isEdit ? 'Сохранить' : 'Редактировать'

  return (
    <Box display='flex' mt={2} flexDirection='column' alignItems='center' ref={editInputWrapperRef}>
      <Grid container sx={{ width: '100%' }} justifyContent='space-between'>
        <Grid item xs={7}>
          <Box sx={{ position: 'relative' }}>
            <Controller
              name='dimension'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    select
                    SelectProps={{
                      MenuProps: {
                        disablePortal: true,
                      },
                    }}
                    defaultValue={watchDimension}
                    disabled={!isEdit}
                    label='Сечение'
                    error={Boolean(errors.dimension)}
                    value={value}
                    onChange={onChange}
                  >
                    {dimensionsOptions?.map(option => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={4.5}>
          <Button
            size='small'
            sx={{ height: '40px', width: '100%' }}
            onClick={() => {
              handleButtonClick(isEdit)
            }}
            variant={isEdit ? 'gray' : 'contained'}
            type='button'
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
