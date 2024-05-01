import { ButtonWithConfirm } from '@/shared/ui'

export const RemoveWoodButton = () => {
  return (
    <ButtonWithConfirm
      size='medium'
      variant='gray'
      sx={{ ml: 1 }}
      header={'Убрать доски'}
      description={'Вы точно хотите убрать доски?'}
      onConfirm={() => {}}
      submitText='Убрать'
    >
      Убрать
    </ButtonWithConfirm>
  )
}
