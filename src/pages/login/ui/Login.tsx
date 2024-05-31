import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material'

import { useAppDispatch } from '@/app/store.ts'
import { LoginForm } from '@/widgets/loginForm'
import { AuthUser, login } from '@/entities/auth'
import { validateUser } from '@/entities/auth/libs/helpers/validateUser.ts'
import { urls } from '@/shared/constants'
import { parseJWT } from '@/shared/libs/helpers'
import { TokenService } from '@/shared/libs/services'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const accessToken = TokenService.getToken()

    if (accessToken === null) {
      return
    }

    const jwtUser = parseJWT(accessToken)

    if (!validateUser(jwtUser)) {
      return
    }

    dispatch(login(jwtUser as AuthUser))
    navigate(`/${urls.dashboard}`)
  }, [])

  return (
    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100vh'>
      <LoginForm />
    </Box>
  )
}
