import { forwardRef, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import {
  CreateUserParams,
  UpdateUserModal,
  useCreateUserMutation,
  useFetchAllRolesQuery,
  USER_ROLE,
  UserFormType,
} from '@/entities/user'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const CreateUserButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const methods = useForm<UserFormType>()
  const { reset } = methods

  const [createUserMutation] = useCreateUserMutation()

  const { data: userRoles, isLoading: isUserRolesLoading } = useFetchAllRolesQuery(undefined, {
    skip: !isOpenModal,
  })

  const { enqueueSnackbar } = useSnackbar()

  const roleOptions = useMemo(() => {
    return userRoles?.map(userRole => ({
      id: userRole.id,
      name: userRole.name,
    }))
  }, [userRoles])

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    reset()
  }

  const handleSave: SubmitHandler<UserFormType> = data => {
    const { firstName, secondName, fatherName, login, role, password } = data

    const roleId = userRoles?.find(userRole => userRole.name === (role as USER_ROLE))?.id ?? -1

    const body: CreateUserParams = {
      login,
      fullName: `${secondName} ${firstName} ${fatherName}`,
      roleId,
      password,
    }

    createUserMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Пользователь успешно создан', { variant: 'success' })
        handleCloseModal()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <UpdateUserModal
        open={isOpenModal}
        methods={methods}
        roleOptions={roleOptions}
        isUserRolesLoading={isUserRolesLoading}
        onClose={handleCloseModal}
        onUpdate={handleSave}
        action='Создать'
        title={`Создать пользователя`}
      />
    </>
  )
})
