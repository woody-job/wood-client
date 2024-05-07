import { Button, MenuItem, Modal, ModalProps, Select, TextField, Typography } from '@mui/material'
import { ModalContent } from '@/shared/ui'
import { FC, FormEventHandler } from 'react'

export interface UpdateDimensionModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: (dimension: unknown) => void
  dimension?: unknown
}

export const UpdateDimensionPriceModal: FC<UpdateDimensionModalProps> = ({
  title,
  action,
  onUpdate,
  dimension,
  ...modalProps
}) => {
  const handleUpdateDimension: FormEventHandler = e => {
    e.preventDefault()
    onUpdate({}) // TODO add update new dimension
  }

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        onSubmit={handleUpdateDimension}
        display='flex'
        flexDirection='column'
        gap={3}
      >
        <Typography>{title}</Typography>

        <TextField label='Ширина (мм)' size='small' />
        <TextField label='Толщина (мм)' size='small' />
        <TextField label='Длина (м)' size='small' />
        <Select value='default' size='small'>
          <MenuItem value='default'>--Сорт--</MenuItem>
          <MenuItem value='sort1'>Первый сорт</MenuItem>
          <MenuItem value='sort2'>Второй сорт</MenuItem>
          <MenuItem value='sort3'>Третий сорт</MenuItem>
        </Select>

        <Button type='submit' variant='contained'>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
