import { FC, useState } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { Dryer, DryerFormType, UpdateDryerModal, useUpdateDryerMutation } from '@/entities/dryer'
import { EditIcon } from '@/shared/ui'
import { SubmitHandler, useForm } from 'react-hook-form'

export type UpdateDryerButtonProps = ButtonProps & {
  dryer: Dryer
}

export const UpdateDryerButton: FC<UpdateDryerButtonProps> = props => {
  const { dryer, ...buttonProps } = props
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updateDryerMutation] = useUpdateDryerMutation()
  const methods = useForm<DryerFormType>({
    defaultValues: {
      ...dryer,
    },
  })
  const { reset } = methods

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer: SubmitHandler<DryerFormType> = values => {
    const { name } = values

    updateDryerMutation({ name, id: dryer.id })
      .unwrap()
      .then(() => {
        handleCloseModal()
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...buttonProps}>
        <EditIcon />
      </IconButton>

      <UpdateDryerModal
        title={'Редактировать сушильную камеру'}
        action={'Редактировать'}
        methods={methods}
        onUpdate={handleCreateDryer}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
}
