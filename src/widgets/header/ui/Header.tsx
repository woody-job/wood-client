import { ModeSwitchButton } from '@/features/mode-switch'
import { Box } from '@mui/material'

export const Header = () => {
  return (
    <Box borderBottom={theme => '1px solid ' + theme.black[10]}>
      <Box py='3px' px='30px' display='flex'>
        <ModeSwitchButton size='small' variant='outlined' sx={{ ml: 'auto' }} />
      </Box>
    </Box>
  )
}
