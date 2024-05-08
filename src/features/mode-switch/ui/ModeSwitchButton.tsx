import { FC } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { switchMode } from '@/entities/theme'
import { MoonIcon, SunIcon } from '@/shared/ui'

export interface ModeSwitchButtonProps extends ButtonProps {}

export const ModeSwitchButton: FC<ModeSwitchButtonProps> = props => {
  const { mode } = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  const handleSwitchMode = () => {
    dispatch(switchMode())
  }

  return (
    <IconButton onClick={handleSwitchMode} aria-label={'сменить тему'} {...props}>
      {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
