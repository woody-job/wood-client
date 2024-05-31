import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { IconButton, IconButtonProps } from '@mui/material'

import { useAppDispatch } from '@/app/store.ts'
import { logout } from '@/entities/auth'
import { urls } from '@/shared/constants'
import { TokenService } from '@/shared/libs/services'
import { ButtonWithConfirm, LogoutIcon } from '@/shared/ui'

export const LogoutButton: FC<IconButtonProps> = props => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    TokenService.removeToken()
    navigate(urls.login)
  }

  return (
    <ButtonWithConfirm
      header={'Выход из системы'}
      description={'Вы уверены, что хотите выйти из системы?'}
      onConfirm={handleLogout}
      submitText='Выйти'
      renderButton={({ onClick }) => (
        <IconButton aria-label={'Выйти из аккаунта'} onClick={onClick} {...props}>
          <LogoutIcon />
        </IconButton>
      )}
    />
  )
}
