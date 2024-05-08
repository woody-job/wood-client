import { forwardRef, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateDimensionPriceModal } from '@/entities/dimension'

export const UpdateDimensionParamsButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)
    const handleOpen = () => setIsOpen(true)

    const handleUpdateDimension = () => {
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
