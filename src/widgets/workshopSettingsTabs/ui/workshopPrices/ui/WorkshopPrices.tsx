import { FC } from 'react'

import { Box } from '@mui/material'

import { EditWorkshopMaterialsPrice } from '@/features/workshop-wood-price/edit-materials-price'
import { EditWorkshopSawingPrice } from '@/features/workshop-wood-price/edit-sawing-price'
import { useUpdateWorkshopMutation } from '@/entities/workshop/api'
import { Workshop } from '@/entities/workshop/model'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { enqueueSnackbar } from 'notistack'

export interface WorkshopPricesProps {
  workshop: Workshop
}

export const WorkshopPrices: FC<WorkshopPricesProps> = ({ workshop }) => {
  const { name, priceOfRawMaterials, sawingPrice, id } = workshop

  const [updateWorkshopMutation] = useUpdateWorkshopMutation()

  const handleNewMaterialPrice = (priceOfRawMaterialsFromForm: string) => {
    const body = {
      workshopId: id,
      workshopData: {
        name,
        priceOfRawMaterials: Number(priceOfRawMaterialsFromForm),
        sawingPrice,
      },
    }

    updateWorkshopMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Цена сырья успешно изменена', { variant: 'success' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const handleNewSawingPrice = (sawingPriceFromParams: string) => {
    const body = {
      workshopId: id,
      workshopData: {
        name,
        priceOfRawMaterials,
        sawingPrice: Number(sawingPriceFromParams),
      },
    }

    updateWorkshopMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Цена распиловки успешно изменена', { variant: 'success' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <EditWorkshopMaterialsPrice
        priceOfRawMaterials={priceOfRawMaterials}
        onSubmit={handleNewMaterialPrice}
      />

      <EditWorkshopSawingPrice sawingPrice={sawingPrice} onSubmit={handleNewSawingPrice} />
    </Box>
  )
}
