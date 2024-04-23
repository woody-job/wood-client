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
        <Typography>Сырье</Typography>

        <EditingField
          renderEditingField={ref => <TextField fullWidth={false} inputRef={ref} />}
          value={'10 000 рублей'}
        />
      </EditingForm>

      <EditingForm onSubmit={handleNewSalary}>
        <Typography>Распиловка</Typography>

        <EditingField
          renderEditingField={ref => <TextField fullWidth={false} inputRef={ref} />}
          value={'100 000 рублей'}
        />
      </EditingForm>
    </Box>
  )
}
