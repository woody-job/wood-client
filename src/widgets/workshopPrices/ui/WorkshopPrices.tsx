import { FC } from 'react'

import { Box, TextField, Typography } from '@mui/material'

import { EditingField, EditingForm } from '@/shared/ui'

export interface WorkshopPricesProps {
  workshopId: number
}

export const WorkshopPrices: FC<WorkshopPricesProps> = () => {
  const handleNewMaterialPrice = () => {
    console.log('new material price')
  }

  const handleNewSalary = () => {
    console.log('new salary')
  }

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <EditingForm onSubmit={handleNewMaterialPrice}>
        <Typography mr={5}>Сырье</Typography>

        <EditingField value={'10 000 рублей'}>
          <TextField fullWidth={false} autoFocus />
        </EditingField>
      </EditingForm>

      <EditingForm onSubmit={handleNewSalary}>
        <Typography>Распиловка</Typography>

        <EditingField value={'100 000 рублей'}>
          <TextField fullWidth={false} autoFocus />
        </EditingField>
      </EditingForm>
    </Box>
  )
}
