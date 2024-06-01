import { Box, Button } from '@mui/material'

export const RouteError = () => {
  return (
    <Box width='100%' display='flex' justifyContent='center' alignItems='center' pt={4} px={2}>
      <Button variant='outlined' size='large' sx={{ textAlign: 'center' }}>
        Ошибка при загрузке страницы
      </Button>
    </Box>
  )
}
