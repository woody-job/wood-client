import { DryerConditionItem } from '@/entities/dryer'
import { Box, Typography } from '@mui/material'
import { InsertWoodButton } from '@/features/dryer/insert-wood'
import { RemoveWoodButton } from '@/features/dryer/remove-wood'

export const Dryer = () => {
  return (
    <Box>
      <Typography variant='h5' component='h1' mb={10}>
        Состояние сушильных камер
      </Typography>

      <Box display='flex' gap='10px' width='100%' justifyContent='center' flexWrap='wrap'>
        {Array.from({ length: 2 }).map(() => (
          <DryerConditionItem
            actions={
              <>
                <InsertWoodButton>Внести</InsertWoodButton>
                <RemoveWoodButton />
              </>
            }
          />
        ))}
      </Box>
    </Box>
  )
}
