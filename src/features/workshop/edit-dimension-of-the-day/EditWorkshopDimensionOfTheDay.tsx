import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Grid } from '@mui/material'

import { useAuth } from '@/entities/auth'
import { useFetchAllDimensionsQuery } from '@/entities/dimension'
import { USER_ROLE } from '@/entities/user'
import {
  UpdateWorkshopDailyDimensionParams,
  useUpdateWorkshopDailyDimensionMutation,
} from '@/entities/workshop'
import { defaultErrorHandler, getUniqueDimensionsFromAllDimensions } from '@/shared/libs/helpers'
import { useOutsideClick } from '@/shared/libs/hooks/click-outside'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithLoader } from '@/shared/ui/button'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'

import { enqueueSnackbar } from 'notistack'

export interface EditWorkshopDimensionOfTheDayProps {
  workshopId: number
  dimensionId: number | null | undefined
  date: string
}

export const EditWorkshopDimensionOfTheDay: FC<EditWorkshopDimensionOfTheDayProps> = ({
  workshopId,
  dimensionId,
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
    reset,
  } = useForm<{ dimensionId: number | null | undefined }>({
    defaultValues: { dimensionId: dimensionId },
  })

  const { data: allDimensions } = useFetchAllDimensionsQuery()

  const [
    updatWorkshopDailyDimensionMutation,
    { isLoading: isLoadingUpdatWorkshopDailyDimensionMutation },
  ] = useUpdateWorkshopDailyDimensionMutation()

  useEffect(() => {
    setValue('dimensionId', dimensionId)
  }, [dimensionId])

  const dimensionsOptions = useMemo(() => {
    if (!allDimensions) {
      return []
    }

    return getUniqueDimensionsFromAllDimensions(allDimensions)
  }, [allDimensions])

  const handleNewDimensionOfTheDay = (dimensionId: number | null | undefined) => {
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
      // TODO Разобраться с автокомплитом для сечения и условного обозначения дня
      // setEdit(false)
      reset({ dimensionId: dimensionId })
    }
  })

  const handleSave = handleSubmit(data => {
    handleNewDimensionOfTheDay(data.dimensionId)
  })

  const handleButtonClick = (isEditing: boolean) => {
    if (isEditing) {
      handleSave()
    }

    if (errors.dimensionId) {
      return
    }

    setEdit((prev: boolean) => !prev)
  }

  const buttonText = isEdit ? 'Сохранить' : 'Редактировать'

  console.log({ disabled: !isEdit })

  return (
    <Box display='flex' mt={2} flexDirection='column' alignItems='center' ref={editInputWrapperRef}>
      <Grid
        container
        sx={{ width: '100%' }}
        justifyContent='space-between'
        spacing={1}
        flexWrap='nowrap'
      >
        <Grid item xs={isAdmin ? 7 : 12} flexShrink={1}>
          <Box sx={{ position: 'relative' }}>
            <FormAutocomplete
              groupBy={option => option.width}
              name={`dimensionId`}
              control={control}
              options={dimensionsOptions}
              placeholder={'Сечение'}
              disabled={!isEdit}
            />
          </Box>
        </Grid>

        {isAdmin && (
          <Grid item xs={5} minWidth={197}>
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
