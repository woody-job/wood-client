import { Button } from '@mui/material'

import { ButtonWithConfirm } from '@/shared/ui'

export const RemoveWoodButton = () => {
  return (
    <ButtonWithConfirm
      size='medium'
      variant='gray'
      header={'Убрать доски'}
      description={'Вы точно хотите убрать доски?'}
      onConfirm={() => {}}
      submitText='Убрать'
      renderButton={({ onClick }) => (
        <Button variant='gray' onClick={onClick}>
          Убрать
        </Button>
      )}
    />
  )
}
