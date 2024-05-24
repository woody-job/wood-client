import { FC } from 'react'

import { Button } from '@mui/material'

import { useTakeOutMutation } from '@/entities/dryer'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { ButtonWithConfirm } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type RemoveWoodButtonProps = {
  dryerId: number
}

export const RemoveWoodButton: FC<RemoveWoodButtonProps> = ({ dryerId }) => {
  const [takeOut] = useTakeOutMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleTakeOut = () => {
    takeOut(dryerId)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Доски успешно убраны', { variant: 'info' })
      })
      .catch(error => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <ButtonWithConfirm
      size='medium'
      variant='gray'
      header={'Убрать доски'}
      description={'Вы точно хотите убрать доски?'}
      onConfirm={handleTakeOut}
      submitText='Убрать'
      renderButton={({ onClick }) => (
        <Button variant='gray' onClick={onClick}>
          Убрать
        </Button>
      )}
    />
  )
}
