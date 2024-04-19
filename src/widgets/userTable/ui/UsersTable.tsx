import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { UpdateUserButton } from '@/features/user/update'
import { DeleteUserButton } from '@/features/user/delete'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

export const UsersTable = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'role', headerName: 'Роль', width: 120 },
    { field: 'login', headerName: 'Логин', width: 120 },
    { field: 'fullname', headerName: 'ФИО', width: 200 },
    { field: 'password', headerName: 'Пароль', width: 150 },
    {
      field: 'actions',
      headerName: '',
      width: 300,
      renderCell: () => (
        <>
          <UpdateUserButton sx={{ mr: 1 }}>Редактировать</UpdateUserButton>
          <DeleteUserButton>Удалить</DeleteUserButton>
        </>
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
    <Box
      sx={{
        height: 400,
        backgroundColor: theme => theme.background.main,
        borderRadius: '18px',
        px: '24px',
        py: '15px',
      }}
    >
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
        sx={{
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            padding: '8px',
            border: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          "& .MuiDataGrid-columnHeaders [role='row']": {
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.background.main : theme.white[100],
          },
          '& .MuiDataGrid-root': {
            borderRadius: '18px',
            overflow: 'auto',
            boxShadow: 1,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 500,
            fontSize: '14px',
            color: theme => theme.black[40],
            backgroundColor: 'transparent',
          },
          '& .MuiDataGrid-columnHeaders': {},
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'center',
          },
        }}
      />
    </Box>
  )
}
