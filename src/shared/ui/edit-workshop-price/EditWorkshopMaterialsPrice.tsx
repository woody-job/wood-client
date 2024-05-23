import { FC, KeyboardEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, TextField, Typography } from '@mui/material'

import { useOutsideClick } from '@/shared/libs/hooks/click-outside/useClickOutside.ts'

export interface EditWorkshopMaterialsPriceProps {
  priceOfRawMaterials: number
  onSubmit: (priceOfRawMaterials: string) => void
}

export const EditWorkshopMaterialsPrice: FC<EditWorkshopMaterialsPriceProps> = ({
  priceOfRawMaterials,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<{ priceOfRawMaterials: string }>({
    defaultValues: { priceOfRawMaterials: `${priceOfRawMaterials}` },
  })

  const [isEdit, setEdit] = useState(false)

  const editInputWrapperRef = useOutsideClick(() => {
    if (isEdit) {
      setEdit(false)
      reset({ priceOfRawMaterials: `${priceOfRawMaterials}` })
    }
  })

  const handleSave = handleSubmit(data => {
    onSubmit(data.priceOfRawMaterials)
  })

  const handleButtonClick = (isEditing: boolean) => {
    if (isEditing) {
      handleSave()
    }

    if (errors.priceOfRawMaterials) {
      return
    }

    setEdit((prev: boolean) => !prev)
  }

  const buttonText = isEdit ? 'Сохранить' : 'Редактировать'

  const handleEnterPress: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.code === 'Enter') {
      handleSave()

      if (errors.priceOfRawMaterials) {
        return
      }

      setEdit((prev: boolean) => !prev)
    }
  }

  return (
    <Box display='flex' alignItems='center' gap={1}>
      <Box ref={editInputWrapperRef} display='inline-flex' gap={1} alignItems='center'>
        <Typography mr={7}>Сырье (₽)</Typography>

        {isEdit && (
          <Box sx={{ position: 'relative' }}>
            {errors.priceOfRawMaterials?.type === 'required' && (
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
              error={Boolean(errors.priceOfRawMaterials)}
              {...register('priceOfRawMaterials', { required: true })}
              fullWidth={false}
              onKeyDown={handleEnterPress}
              autoFocus
              size='small'
              type='number'
            />
          </Box>
        )}
        {!isEdit && <TextField fullWidth={false} value={watch('priceOfRawMaterials')} disabled />}
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
