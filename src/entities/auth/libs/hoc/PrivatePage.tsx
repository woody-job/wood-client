import { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/store.ts'
import { AuthUser, login, logout, useAuth } from '@/entities/auth'
import { validateUser } from '@/entities/auth/libs/helpers/validateUser.ts'
import { urls } from '@/shared/constants'
import { parseJWT } from '@/shared/libs/helpers'
import { TokenService } from '@/shared/libs/services'

export const PrivatePage = () => {
  const user = useAuth()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    TokenService.removeToken()
    navigate(urls.login)
  }

  useEffect(() => {
    const accessToken = TokenService.getToken()

    if (accessToken === null) return handleLogout()
    const jwtUser = parseJWT(accessToken)

    if (!validateUser(jwtUser)) return handleLogout()

    dispatch(login(jwtUser as AuthUser))
  }, [])

  return user === null ? null : <Outlet />
}
