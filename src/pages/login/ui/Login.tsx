import { Box } from '@mui/material'

import { LoginForm } from '@/widgets/loginForm'

export const Login = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100vh'>
      <LoginForm />
    </Box>
  )
}
