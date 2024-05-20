import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { UpdateUserButton } from '@/features/user/update'
import { ButtonWithConfirm, dataGridStyles } from '@/shared/ui'
import { CustomGridPanel, DataGridContainer, dataGridLocaleText } from '@/shared/ui/data-grid'

export const UsersTable = () => {
  const handleDeleteUser = () => {}

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'role', headerName: 'Роль', width: 120 },
    { field: 'login', headerName: 'Логин', width: 120 },
    { field: 'fullname', headerName: 'ФИО', width: 200 },
    { field: 'password', headerName: 'Пароль', width: 150 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: () => (
        <Box sx={{ ml: 'auto' }}>
          <UpdateUserButton sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header='Удалить пользователя'
            description='Вы уверены, что хотите удалить пользователя?'
            onConfirm={handleDeleteUser}
          />
        </Box>
      ),
    },
  ]

  const rows = [
    {
      id: 1,
      role: 'admin',
      login: 'admin',
      fullname: 'Админ Админ Админкин',
      password: '<PASSWORD>',
    },
    {
      id: 2,
      role: 'user',
      login: 'user',
      fullname: 'Ванек Юзер Дмитриевич',
      password: '<PASSWORD>',
    },
    {
      id: 3,
      role: 'admin',
      login: 'admin',
      fullname: 'Админ Админ Админкин',
      password: '<PASSWORD>',
    },
    {
      id: 4,
      role: 'user',
      login: 'user',
      fullname: 'Ванек Юзер Дмитриевич',
      password: '<PASSWORD>',
    },
    {
      id: 5,
      role: 'admin',
      login: 'admin',
      fullname: 'Админ Админ Админкин',
      password: '<PASSWORD>',
    },
    {
      id: 6,
      role: 'user',
      login: 'user',
      fullname: 'Ванек Юзер Дмитриевич',
      password: '<PASSWORD>',
    },
  ]

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
    </DataGridContainer>
  )
}
