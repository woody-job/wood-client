import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {UpdateUserButton} from "@/features/user/update";
import {DeleteUserButton} from "@/features/user/delete";

export const UsersTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Роль</TableCell>
                        <TableCell>Логин</TableCell>
                        <TableCell>ФИО</TableCell>
                        <TableCell>Пароль</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            1337
                        </TableCell>
                        <TableCell align="right">Супер админ</TableCell>
                        <TableCell align="right">admin</TableCell>
                        <TableCell align="right">Admin Admin Adminovich</TableCell>
                        <TableCell align="right">admin-super</TableCell>
                        <TableCell align="right">
                            <Box sx={{display: 'flex', gap: 1}}>
                                <UpdateUserButton>Редактировать</UpdateUserButton>
                                <DeleteUserButton>Удалить</DeleteUserButton>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}