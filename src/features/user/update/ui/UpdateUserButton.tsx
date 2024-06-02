import { FC, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import { UserTableRow } from '@/widgets/userTable/types'
import {
  UpdateUserModal,
  UpdateUserParams,
  useFetchAllRolesQuery,
  UserFormType,
  useUpdateUserMutation,
} from '@/entities/user'
import { USER_ROLE } from '@/entities/user/contansts'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { getDefaultValues } from '../lib/helpers'
import { useSnackbar } from 'notistack'

type UpdateUserButtonProps = { user: UserTableRow } & ButtonProps

export const UpdateUserButton: FC<UpdateUserButtonProps> = ({ user, ...props }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const methods = useForm<UserFormType>({ defaultValues: getDefaultValues(user) })
  const { reset } = methods

  const [updateUserMutation, { isLoading: isLoadingUpdateUserMutation }] = useUpdateUserMutation()

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

    const body: UpdateUserParams = {
      userId: user.id,
      userData: {
        login,
        fullName: `${secondName.trim()} ${firstName.trim()} ${fatherName.trim()}`,
        roleId,
        password,
      },
    }

    updateUserMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Пользователь успешно обновлён', { variant: 'success' })
        handleCloseModal()
        reset()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...props}>
        <EditIcon />
      </IconButton>

      <UpdateUserModal
        open={isOpenModal}
        methods={methods}
        roleOptions={roleOptions}
        isUserRolesLoading={isUserRolesLoading}
        onClose={handleCloseModal}
        onUpdate={handleSave}
        title='Редактировать пользователя'
        action='Редактировать'
        isLoading={isLoadingUpdateUserMutation}
      />
    </>
  )
}
