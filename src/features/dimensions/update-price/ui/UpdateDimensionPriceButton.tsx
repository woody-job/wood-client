import { forwardRef, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps, IconButton, Modal, TextField, Typography } from '@mui/material'

import { WorkshopWoodPricesTableRow } from '@/widgets/workshopSettingsTabs/types'
import { useFetchAllDimensionsQuery } from '@/entities/dimension'
import {
  CreateWorkshopWoodPriceParams,
  UpdateWorkshopWoodPriceParams,
  useCreateWorkshopWoodPriceMutation,
  useFetchWorkshopWoodPricesQuery,
  useUpdateWorkshopWoodPriceMutation,
} from '@/entities/workshop-wood-price'
import { EditIcon, ModalContent } from '@/shared/ui'

type UpdateDimensionPriceButtonProps = {
  workshopWoodPrice: WorkshopWoodPricesTableRow
  workshopId: number
} & ButtonProps

export const UpdateDimensionPriceButton = forwardRef<
  HTMLButtonElement,
  UpdateDimensionPriceButtonProps
>(({ workshopWoodPrice, workshopId, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const [createWorkshopWoodPriceMutation] = useCreateWorkshopWoodPriceMutation()
  const [updateWorkshopWoodPriceMutation] = useUpdateWorkshopWoodPriceMutation()

  const { data: dimensions } = useFetchAllDimensionsQuery(undefined)
  const { data: workshopWoodPrices } = useFetchWorkshopWoodPricesQuery({ workshopId })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<{ price: string }>()

  useEffect(() => {
    if (!workshopWoodPrice.price) {
      return
    }

    setValue('price', workshopWoodPrice.price)
  }, [workshopWoodPrice])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleSave: SubmitHandler<{ price: string }> = data => {
    const currentDimension = dimensions?.find(dimension => dimension.id === workshopWoodPrice.id)

    if (!currentDimension) {
      return
    }

    const workshopWoodPriceByDimension = workshopWoodPrices?.find(
      workshopWoodPrice => workshopWoodPrice.dimension.id === currentDimension.id
    )

    if (workshopWoodPrice.price === undefined && !workshopWoodPriceByDimension) {
      const body: CreateWorkshopWoodPriceParams = {
        price: Number(data.price),
        workshopId: workshopId,
        dimensionId: currentDimension.id,
        woodClassId: currentDimension.woodClass.id,
      }

      createWorkshopWoodPriceMutation(body)
        .unwrap()
        .then(() => {
          alert('CREATE SUCCESSFUL')
          // TODO Добавить уведомления
        })
        .catch(() => {
          // TODO Добавить уведомления
        })
    }

    if (workshopWoodPriceByDimension) {
      const body: UpdateWorkshopWoodPriceParams = {
        price: Number(data.price),
        workshopWoodPriceId: workshopWoodPriceByDimension.id,
      }

      updateWorkshopWoodPriceMutation(body)
        .unwrap()
        .then(() => {
          alert('UPDATE SUCCESSFUL')
          // TODO Добавить уведомления
        })
        .catch(() => {
          // TODO Добавить уведомления
        })
    }

    handleClose()
    reset()
  }

  const title = `Редактировать сечение ${workshopWoodPrice.dimension}`

  return (
    <>
      <IconButton ref={ref} onClick={handleOpen} {...props}>
        <EditIcon />
      </IconButton>

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent
          component='form'
          onSubmit={handleSubmit(handleSave)}
          display='flex'
          flexDirection='column'
          gap={3}
        >
          <Typography variant='h6' component='p' sx={{ textAlign: 'center', mb: 3 }}>
            {title}
          </Typography>

          <TextField
            type='number'
            inputProps={{ ...register('price', { required: true }) }}
            label='Цена'
            size='small'
            id='price'
            error={Boolean(errors.price)}
          />
          {errors.price?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Цена обязательна
            </Typography>
          )}

          <Button type='submit' variant='contained'>
            Редактировать
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
})
