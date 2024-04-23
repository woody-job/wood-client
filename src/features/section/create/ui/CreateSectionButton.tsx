import { Button, ButtonProps, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { FormEventHandler, forwardRef, useState } from 'react'
import { ModalContent } from '@/shared/ui'

export const CreateSectionButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const handleUpdateSection: FormEventHandler = e => {
    e.preventDefault()

    console.log('update-params section')
    handleClose()
  }

  return (
    <>
      <Button variant='gray' ref={ref} onClick={handleOpen} {...props} />

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent
          component='form'
          onSubmit={handleUpdateSection}
          display='flex'
          flexDirection='column'
          gap={3}
        >
          <Typography>Создать сечение</Typography>

          <TextField label='Ширина (мм)' />
          <TextField label='Толщина (мм)' />
          <TextField label='Длина (м)' />
          <Select>
            <MenuItem value='sort1'>Первый сорт</MenuItem>
            <MenuItem value='sort2'>Второй сорт</MenuItem>
            <MenuItem value='sort3'>Третий сорт</MenuItem>
          </Select>

          <Button type='submit' variant='contained'>
            Создать
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
})
