import { FC, useMemo } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { UpdateUserButton } from '@/features/user/update'
import { useDeleteUserMutation, User } from '@/entities/user'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithConfirm, dataGridStyles } from '@/shared/ui'
import { CustomGridPanel, DataGridContainer, dataGridLocaleText } from '@/shared/ui/data-grid'

import { USER_TABLE_COLUMNS } from '../constants'
import { UserTableRow } from '../types'
import { useSnackbar } from 'notistack'

type UsersTableProps = {
  users: User[] | undefined
  isLoadingUsers: boolean
}

export const UsersTable: FC<UsersTableProps> = ({ users, isLoadingUsers }) => {
  const [deleteUserMutation] = useDeleteUserMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation({ userId })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Пользователь успешно удален', { variant: 'info' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const columns: GridColDef[] = [
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
