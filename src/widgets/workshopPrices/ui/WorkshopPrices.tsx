import { FC } from 'react'
import { Box, Button, TextField } from '@mui/material'

export interface WorkshopPricesProps {
  workshopId: number
}

export const WorkshopPrices: FC<WorkshopPricesProps> = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Box display='flex' alignItems='center' gap={1}>
        <TextField fullWidth={false} label='Сырье' />
        <Button variant='contained' size='small'>
          Редактировать
        </Button>
      </Box>
      <Box display='flex' alignItems='center' gap={1}>
        <TextField fullWidth={false} label='Распиловка' />
        <Button variant='contained' size='small'>
          Редактировать
        </Button>
      </Box>
    </Box>
  )
}
