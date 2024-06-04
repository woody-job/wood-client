import { Box, Typography } from '@mui/material'

import { UsersTable } from '@/widgets/userTable'
import { CreateUserButton } from '@/features/user/create'
import { useFetchAllUsersQuery } from '@/entities/user'
import { TableFullscreen } from '@/shared/ui'

export const AdminUsers = () => {
  const { data: users, isLoading: isLoadingUsers } = useFetchAllUsersQuery()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography component='h1' variant='h5' sx={{ mb: 5 }}>
        Управление пользователями
      </Typography>

      <CreateUserButton sx={{ alignSelf: 'flex-end', mb: 2 }}>Новый пользователь</CreateUserButton>

      <TableFullscreen
        renderTable={props => (
          <UsersTable users={users} isLoadingUsers={isLoadingUsers} {...props} />
        )}
      />
    </Box>
  )
}
