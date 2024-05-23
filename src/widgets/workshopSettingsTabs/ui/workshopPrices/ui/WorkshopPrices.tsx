import { FC } from 'react'

import { Box } from '@mui/material'

import { useUpdateWorkshopMutation } from '@/entities/workshop/api'
import { Workshop } from '@/entities/workshop/model'
import { EditWorkshopMaterialsPrice, EditWorkshopSawingPrice } from '@/shared/ui'

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
        console.log('Уведомление об успешном изменении')
      })
      .catch(error => {
        console.log('Уведомление об ошибке', error)
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
        console.log('Уведомление об успешном изменении')
      })
      .catch(error => {
        console.log('Уведомление об ошибке', error)
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
