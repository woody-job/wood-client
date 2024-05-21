import { forwardRef, useState } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { UpdateDimensionPriceModal } from '@/entities/dimension'
import { EditIcon } from '@/shared/ui'

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
        <IconButton ref={ref} onClick={handleOpen} {...props}>
          <EditIcon />
        </IconButton>

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
