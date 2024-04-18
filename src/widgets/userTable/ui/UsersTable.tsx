import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { UpdateUserButton } from '@/features/user/update'
import { DeleteUserButton } from '@/features/user/delete'
import { tokens } from '@/shared/constants/tokens'

export const UsersTable = () => {
  const data = [
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
  ] // TODO будет вместо этого - запрос

  return (
    <TableContainer
      sx={{
        backgroundColor: tokens.background.main,
        p: '24px',
        borderRadius: '18px',
        overflow: 'auto',
        boxShadow: 1,
      }}
    >
      <Typography variant='subtitle1' fontWeight='bold' mb='15px'>
        Пользователи
      </Typography>

      <Table
        sx={{
          '& td, & th': {
            p: 1,
          },
        }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow sx={{ '& th': { color: tokens.black[40] } }}>
            <TableCell>Id</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Логин</TableCell>
            <TableCell>ФИО</TableCell>
            <TableCell>Пароль</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ '& td, & th': { border: 0, width: 'auto', maxWidth: '200px' } }}>
          {data.map(user => (
            <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: tokens.black[5] } }}>
              <TableCell component='th'>{user.id}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell align='right'>
                <UpdateUserButton sx={{ mr: 1 }}>Редактировать</UpdateUserButton>
                <DeleteUserButton>Удалить</DeleteUserButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
