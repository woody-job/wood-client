import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import {
  UpdateWoodNamingModal,
  useUpdateWoodNamingMutation,
  WoodNaming,
  WoodNamingFormType,
} from '@/entities/wood-naming'
import { EditIcon } from '@/shared/ui'

export interface UpdateWoodNamingButtonProps extends ButtonProps {
  woodNaming: WoodNaming
}

export const UpdateWoodNamingButton: FC<UpdateWoodNamingButtonProps> = props => {
  const { woodNaming, ...buttonProps } = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updateWoodNamingMutation] = useUpdateWoodNamingMutation()

  const methods = useForm<WoodNamingFormType>({
    defaultValues: woodNaming,
  })
  const { reset } = methods

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateWoodName: SubmitHandler<WoodNamingFormType> = values => {
    updateWoodNamingMutation({
      id: woodNaming.id,
      name: values.name,
    })
      .unwrap()
      .then(() => {
        handleCloseModal()
        reset()
      })
      .catch(e => {
        console.error(e)
      })
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...buttonProps}>
        <EditIcon />
      </IconButton>

      <UpdateWoodNamingModal
        onUpdate={handleUpdateWoodName}
        methods={methods}
        action={'Редактировать'}
        title={'Редактирвать обозначение'}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
}
