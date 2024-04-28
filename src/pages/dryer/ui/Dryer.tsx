import { DryerConditionItem } from '@/entities/dryer'
import { Box, Typography } from '@mui/material'

export const Dryer = () => {
  return (
    <Box>
      <Typography variant='h5' component='h1' mb={10}>
        Состояние сушильных камер
      </Typography>

      <Box display='flex' gap='10px' width='100%' justifyContent='center' flexWrap='wrap'>
        <DryerConditionItem />
        <DryerConditionItem />
      </Box>
    </Box>
  )
}
