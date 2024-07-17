import { FC, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Box, Grid, MenuItem, Select } from '@mui/material'

import { useAuth } from '@/entities/auth'
import { USER_ROLE } from '@/entities/user'
import { useFetchAllWoodNamingsQuery } from '@/entities/wood-naming'
import {
  UpdateWorkshopDailyWoodNamingParams,
  useUpdateWorkshopDailyWoodNamingMutation,
} from '@/entities/workshop'
import { EVENT_NAME } from '@/shared/constants'
import { defaultErrorHandler, publish } from '@/shared/libs/helpers'
import { useOutsideClick } from '@/shared/libs/hooks/click-outside'
import { CommonErrorType } from '@/shared/types'
import { SelectPlaceholderWrapper } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { enqueueSnackbar } from 'notistack'

export interface EditWoodNamingOfTheDayProps {
  workshopId: number
  woodNamingOfTheDay: string | undefined | null
  date: string
}

export const EditWoodNamingOfTheDay: FC<EditWoodNamingOfTheDayProps> = ({
  workshopId,
  woodNamingOfTheDay,
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
  } = useForm<{ woodNaming: string | null | undefined }>({
    defaultValues: { woodNaming: woodNamingOfTheDay },
  })

  const watchWoodNaming = watch('woodNaming')

  const { data: allwoodNamings } = useFetchAllWoodNamingsQuery()

  const [
    updatWorkshopDailywoodNamingMutation,
    { isLoading: isLoadingUpdatWorkshopDailywoodNamingMutation },
  ] = useUpdateWorkshopDailyWoodNamingMutation()

  useEffect(() => {
    setValue('woodNaming', woodNamingOfTheDay)
  }, [woodNamingOfTheDay])

  const woodNamingsOptions = useMemo(() => {
    if (!allwoodNamings) {
      return []
    }

    return allwoodNamings.map(woodNaming => {
      return {
        id: woodNaming.id,
        name: woodNaming.name,
      }
    })
  }, [allwoodNamings])

  const handleNewwoodNamingOfTheDay = (woodNamingString: typeof woodNamingOfTheDay) => {
    const woodNamingId = woodNamingsOptions.find(option => option.name === woodNamingString)?.id

    if (!woodNamingId) {
      return
    }

    const body: UpdateWorkshopDailyWoodNamingParams = {
      workshopId,
      woodNamingId,
      date,
    }

    updatWorkshopDailywoodNamingMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Условное обозначение дня успешно изменено', { variant: 'success' })
        publish(EVENT_NAME.WOOD_NAMING_OF_THE_DAY_CHANGE, {
          woodNamingId,
        })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const editInputWrapperRef = useOutsideClick(() => {
    if (isEdit) {
      setEdit(false)
      reset({ woodNaming: woodNamingOfTheDay })
    }
  })

  const handleSave = handleSubmit(data => {
    handleNewwoodNamingOfTheDay(data.woodNaming)
  })

  const handleButtonClick = (isEditing: boolean) => {
    if (isEditing) {
      handleSave()
    }

    if (errors.woodNaming) {
      return
    }

    setEdit((prev: boolean) => !prev)
  }

  const buttonText = isEdit ? 'Сохранить' : 'Редактировать'

  return (
    <Box display='flex' mt={2} flexDirection='column' alignItems='center' ref={editInputWrapperRef}>
      <Grid
        container
        sx={{ width: '100%' }}
        justifyContent='space-between'
        spacing={1}
        flexWrap='nowrap'
      >
        <Grid item xs={isAdmin ? 7 : 12}>
          <Box title={!watchWoodNaming ? 'Условное обозначение дня' : ''}>
            <Controller
              name='woodNaming'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectPlaceholderWrapper
                    shouldShowPlaceholder={!watchWoodNaming}
                    placeholderText='Условное обозначение'
                  >
                    <Select
                      MenuProps={{
                        disablePortal: true,
                      }}
                      sx={{ width: '100%' }}
                      defaultValue={watchWoodNaming}
                      disabled={!isEdit}
                      error={Boolean(errors.woodNaming)}
                      value={value}
                      onChange={onChange}
                    >
                      {woodNamingsOptions?.map(option => (
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
          <Grid item xs={5} minWidth={197}>
            <ButtonWithLoader
              isLoading={isLoadingUpdatWorkshopDailywoodNamingMutation}
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
