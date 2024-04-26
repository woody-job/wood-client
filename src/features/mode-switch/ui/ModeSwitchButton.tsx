import { Button, ButtonProps } from '@mui/material'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { switchMode } from '@/enitities/theme'

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
