import { FC, useMemo } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

import { UpdateUserButton } from '@/features/user/update'
import { useDeleteUserMutation,User } from '@/entities/user'
import { ButtonWithConfirm, dataGridStyles } from '@/shared/ui'
import { CustomGridPanel, DataGridContainer, dataGridLocaleText } from '@/shared/ui/data-grid'

import { USER_TABLE_COLUMNS } from '../constants'
import { UserTableRow } from '../types'

type UsersTableProps = {
  users: User[] | undefined
  isLoadingUsers: boolean
}

export const UsersTable: FC<UsersTableProps> = ({ users, isLoadingUsers }) => {
  const [deleteUserMutation] = useDeleteUserMutation()

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation({ userId })
  }

  const columns = useMemo(() => {
    return [
      ...USER_TABLE_COLUMNS,
      {
        field: 'actions',
        headerName: '',
        disableColumnMenu: true,
        sortable: false,
        width: 300,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <>
              <UpdateUserButton user={params.row} sx={{ mr: 1 }}>
                Редактировать
              </UpdateUserButton>
              <ButtonWithConfirm
                header='Удалить пользователя'
                description='Вы уверены, что хотите удалить пользователя?'
                onConfirm={() => {
                  handleDeleteUser(params.row.id)
                }}
              >
                Удалить
              </ButtonWithConfirm>
            </>
          )
        },
      },
    ]
  }, [users])

  const rows: UserTableRow[] = useMemo(() => {
    return users
      ? users?.map(user => {
          return {
            id: user.id,
            role: user.role.name,
            login: user.login,
            fullName: user.fullName,
          }
        })
      : []
  }, [users])

  return (
    <DataGridContainer>
      <Typography
        variant='subtitle1'
        fontWeight='bold'
        mb='15px'
        sx={{ paddingLeft: '24px', paddingTop: '24px' }}
      >
        Пользователи
      </Typography>
      {isLoadingUsers && (
        <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {users && (
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableMultipleRowSelection
          localeText={dataGridLocaleText}
          sx={dataGridStyles}
          hideFooter
          slots={{ panel: CustomGridPanel }}
        />
      )}
    </DataGridContainer>
  )
}
