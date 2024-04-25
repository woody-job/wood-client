import { Button, ButtonProps } from '@mui/material'
import { forwardRef, useState } from 'react'
import { UpdateDimensionPriceModal } from '@/enitities/dimension'

export const UpdateDimensionParamsButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)
    const handleOpen = () => setIsOpen(true)

    const handleUpdateDimension = (dimension: unknown) => {
      handleClose()
    }

    return (
      <>
        <Button size='small' variant='gray' ref={ref} onClick={handleOpen} {...props} />

        <UpdateDimensionPriceModal
          title={'Редактировать сечение'}
          action={'Редактировать'}
          onUpdate={handleUpdateDimension}
          open={isOpen}
          onClose={handleClose}
          dimension={{}}
        />
      </>
    )
  }
)
