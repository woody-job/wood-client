import { FC, KeyboardEventHandler, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Box, Button, Grid, MenuItem, Select, TextField } from '@mui/material'

import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { enqueueSnackbar } from 'notistack'
import {
  UpdateWorkshopDailyWoodNamingParams,
  useUpdateWorkshopDailyWoodNamingMutation,
} from '@/entities/workshop'
import { useOutsideClick } from '@/shared/libs/hooks/click-outside'
import { useFetchAllWoodNamingsQuery } from '@/entities/wood-naming'

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

  const [updatWorkshopDailywoodNamingMutation] = useUpdateWorkshopDailyWoodNamingMutation()

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
      <Grid container sx={{ width: '100%' }} justifyContent='space-between'>
        <Grid item xs={7}>
          <Box sx={{ position: 'relative' }}>
            <Controller
              name='woodNaming'
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
                    defaultValue={watchWoodNaming}
                    disabled={!isEdit}
                    label='Условное обозначение'
                    error={Boolean(errors.woodNaming)}
                    value={value}
                    onChange={onChange}
                  >
                    {woodNamingsOptions?.map(option => (
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
