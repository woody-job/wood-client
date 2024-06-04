import { useState } from 'react'

import { Box, Modal, Typography } from '@mui/material'

import { UsersTable } from '@/widgets/userTable'
import { CreateUserButton } from '@/features/user/create'
import { useFetchAllUsersQuery } from '@/entities/user'
import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal/ModalCloseButton'

export const AdminUsers = () => {
  const { data: users, isLoading: isLoadingUsers } = useFetchAllUsersQuery()

  const [isOpen, setIsOpen] = useState(false)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

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

      <Modal open={isOpen} onClose={handleCloseModal}>
        <ModalContent fullscreen>
          <ModalCloseButton onClick={handleCloseModal} />
          <UsersTable users={users} isLoadingUsers={isLoadingUsers} fullscreen />
        </ModalContent>
      </Modal>

      <UsersTable users={users} isLoadingUsers={isLoadingUsers} onFullscreen={handleOpenModal} />
    </Box>
  )
}
