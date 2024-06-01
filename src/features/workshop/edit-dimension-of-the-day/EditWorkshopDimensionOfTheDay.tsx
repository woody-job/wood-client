import { FC, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Box, Grid, MenuItem, Select } from '@mui/material'

import { useAuth } from '@/entities/auth'
import { getDimensionString, useFetchAllDimensionsQuery } from '@/entities/dimension'
import { USER_ROLE } from '@/entities/user'
import {
  UpdateWorkshopDailyDimensionParams,
  useUpdateWorkshopDailyDimensionMutation,
} from '@/entities/workshop'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { useOutsideClick } from '@/shared/libs/hooks/click-outside'
import { CommonErrorType } from '@/shared/types'
import { SelectPlaceholderWrapper } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { enqueueSnackbar } from 'notistack'

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

  const user = useAuth()

  const isAdmin = user?.role.name === USER_ROLE.SUPERADMIN || user?.role.name === USER_ROLE.ADMIN

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

  const [
    updatWorkshopDailyDimensionMutation,
    { isLoading: isLoadingUpdatWorkshopDailyDimensionMutation },
  ] = useUpdateWorkshopDailyDimensionMutation()

  useEffect(() => {
    setValue('dimension', dimensionOfTheDay)
  }, [dimensionOfTheDay])

  const dimensionsOptions = useMemo(() => {
    if (!allDimensions) {
      return []
    }

    const uniqueDimensionNamesOptions: {
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
        <Grid item xs={isAdmin ? 7 : 12}>
          <Box sx={{ position: 'relative' }}>
            <Controller
              name='dimension'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectPlaceholderWrapper
                    shouldShowPlaceholder={!watchDimension}
                    placeholderText='Сечение'
                  >
                    <Select
                      MenuProps={{
                        disablePortal: true,
                      }}
                      sx={{ width: '100%' }}
                      defaultValue={watchDimension}
                      disabled={!isEdit}
                      error={Boolean(errors.dimension)}
                      value={value}
                      onChange={onChange}
                    >
                      {dimensionsOptions?.map(option => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </SelectPlaceholderWrapper>
                )
              }}
            />
          </Box>
        </Grid>

        {isAdmin && (
          <Grid item xs={4.5}>
            <ButtonWithLoader
              isLoading={isLoadingUpdatWorkshopDailyDimensionMutation}
              loaderSx={{ left: -28 }}
              size='small'
              sx={{ height: '40px', width: '100%' }}
              onClick={() => {
                handleButtonClick(isEdit)
              }}
              variant={isEdit ? 'gray' : 'contained'}
              type='button'
            >
              {buttonText}
            </ButtonWithLoader>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
