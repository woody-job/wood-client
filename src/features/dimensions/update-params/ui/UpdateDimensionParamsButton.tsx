import { Button, ButtonProps, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { FormEventHandler, forwardRef, useState } from 'react'
import { ModalContent } from '@/shared/ui'

export const UpdateDimensionParamsButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)
    const handleOpen = () => setIsOpen(true)

    const handleUpdateSection: FormEventHandler = e => {
      e.preventDefault()

      console.log('update-params dimensions')
      handleClose()
    }

    return (
      <>
        <Button size='small' variant='gray' ref={ref} onClick={handleOpen} {...props} />

        <Modal open={isOpen} onClose={handleClose}>
          <ModalContent
            component='form'
            onSubmit={handleUpdateSection}
            display='flex'
            flexDirection='column'
            gap={3}
          >
            <Typography>Редактировать сечение</Typography>

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
              Редактировать
            </Button>
          </ModalContent>
        </Modal>
      </>
    )
  }
)
