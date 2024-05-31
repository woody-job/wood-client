import { Box, Typography } from '@mui/material'

import { LogoutButton } from '@/features/auth/logout'
import { ModeSwitchButton } from '@/features/mode-switch'
import { useAuth } from '@/entities/auth'
import { UserIcon } from '@/shared/ui'

export const Header = () => {
  const user = useAuth()

  return (
    <Box borderBottom={theme => '1px solid ' + theme.black[10]}>
      <Box display='flex' py='4px' px='30px' alignItems='center'>
        <Box display='flex' gap={1} alignItems='center'>
          <UserIcon sx={{ width: '18px', color: theme => theme.black['80'] }} />
          <Typography variant='subtitle1'>{user?.fullName}</Typography>
        </Box>

        <ModeSwitchButton sx={{ ml: 'auto' }} />
        <LogoutButton />
      </Box>
    </Box>
  )
}
