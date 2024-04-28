import { Box, Button, Typography } from '@mui/material'
import { DryerConditionSunburst } from '@/entities/dryer'
import { ButtonWithConfirm, DashItem } from '@/shared/ui'

export const DryerConditionItem = () => {
  return (
    <Box
      sx={{
        '&:nth-child(2n) .dryer-condition-item': {
          backgroundColor: theme => theme.primary.purpleOpacity,
        },
        '&:nth-child(2n+1) .dryer-condition-item': {
          backgroundColor: theme => theme.primary.blue,
        },
      }}
    >
      <DashItem
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        className='dryer-condition-item'
      >
        <Typography variant='h6'>Камера 1</Typography>
        <Typography variant='subtitle1'>Цикл 501</Typography>

        <DryerConditionSunburst />
      </DashItem>

      <Box width='100' display='flex' justifyContent='space-evenly' mt={1}>
        <Button variant='outlined'>Внести</Button>
        <ButtonWithConfirm
          size='medium'
          variant='gray'
          sx={{ ml: 1 }}
          header={'Убрать доски'}
          description={'Вы точно хотите убрать доски?'}
          onConfirm={() => {}}
          submitText='Убрать'
        >
          Убрать
        </ButtonWithConfirm>
      </Box>
    </Box>
  )
}
