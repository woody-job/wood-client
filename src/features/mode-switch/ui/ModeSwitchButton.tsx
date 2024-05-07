import { FC } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { switchMode } from '@/entities/theme'

export interface ModeSwitchButtonProps extends ButtonProps {}

export const ModeSwitchButton: FC<ModeSwitchButtonProps> = props => {
  const { mode } = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  const handleSwitchMode = () => {
    dispatch(switchMode())
  }

  return (
    <Button onClick={handleSwitchMode} {...props}>
      {mode === 'light' ? 'светлая' : 'темная'}
    </Button>
  )
}
