import { GridColDef } from '@mui/x-data-grid'

export const USER_TABLE_COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 0.3 },
  { field: 'role', headerName: 'Роль', flex: 1 },
  { field: 'login', headerName: 'Логин', flex: 1 },
  { field: 'fullName', headerName: 'ФИО', flex: 2 },
]
