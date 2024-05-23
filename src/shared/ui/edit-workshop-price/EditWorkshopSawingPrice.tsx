import { FC, KeyboardEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, TextField, Typography } from '@mui/material'

import { useOutsideClick } from '@/shared/libs/hooks/click-outside/useClickOutside.ts'

export interface EditWorkshopSawingPriceProps {
  sawingPrice: number
  onSubmit: (sawingPrice: string) => void
}

export const EditWorkshopSawingPrice: FC<EditWorkshopSawingPriceProps> = ({
  sawingPrice,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<{ sawingPrice: string }>({
    defaultValues: { sawingPrice: `${sawingPrice}` },
  })

  const [isEdit, setEdit] = useState(false)

  const editInputWrapperRef = useOutsideClick(() => {
    if (isEdit) {
      setEdit(false)
      reset({ sawingPrice: `${sawingPrice}` })
    }
  })

  const handleSave = handleSubmit(data => {
    onSubmit(data.sawingPrice)
  })

  const handleButtonClick = (isEditing: boolean) => {
    if (isEditing) {
      handleSave()
    }

    if (errors.sawingPrice) {
      return
    }

    setEdit((prev: boolean) => !prev)
  }

  const buttonText = isEdit ? 'Сохранить' : 'Редактировать'

  const handleEnterPress: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.code === 'Enter') {
      handleSave()

      if (errors.sawingPrice) {
        return
      }

      setEdit((prev: boolean) => !prev)
    }
  }

  return (
    <Box display='flex' alignItems='center' gap={1}>
      <Box ref={editInputWrapperRef} display='inline-flex' gap={1} alignItems='center'>
        <Typography mr={2}>Распиловка (₽/м3)</Typography>

        {isEdit && (
          <Box sx={{ position: 'relative' }}>
            {errors.sawingPrice?.type === 'required' && (
              <Typography
                variant='caption'
                sx={{
                  color: theme => theme.palette.error.main,
                  position: 'absolute',
                  top: -20,
                  left: 0,
                }}
              >
                Цена обязательна
              </Typography>
            )}
            <TextField
              error={Boolean(errors.sawingPrice)}
              {...register('sawingPrice', { required: true })}
              fullWidth={false}
              onKeyDown={handleEnterPress}
              autoFocus
              size='small'
              type='number'
            />
          </Box>
        )}
        {!isEdit && <TextField fullWidth={false} value={watch('sawingPrice')} disabled />}
        <Button
          size='small'
          onClick={() => {
            handleButtonClick(isEdit)
          }}
          variant={isEdit ? 'gray' : 'contained'}
          type='button'
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}
