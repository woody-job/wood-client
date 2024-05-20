import { FC, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import { UserTableRow } from '@/widgets/userTable/types'
import {
  UpdateUserModal,
  UpdateUserParams,
  useFetchAllRolesQuery,
  UserFormType,
  useUpdateUserMutation,
} from '@/entities/user'
import { USER_ROLE } from '@/entities/user/contansts'

import { getDefaultValues } from '../lib/helpers'

type UpdateUserButtonProps = { user: UserTableRow } & ButtonProps

export const UpdateUserButton: FC<UpdateUserButtonProps> = ({ user, ...props }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const methods = useForm<UserFormType>({ defaultValues: getDefaultValues(user) })
  const { reset } = methods

  const [updateUserMutation] = useUpdateUserMutation()

  const { data: userRoles, isLoading: isUserRolesLoading } = useFetchAllRolesQuery(undefined, {
    skip: !isOpenModal,
  })

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
        fullName: `${secondName} ${firstName} ${fatherName}`,
        roleId,
        password,
      },
    }

    updateUserMutation(body)
      .unwrap()
      .then(() => {
        console.log('Уведомление об успешном создании')

        handleCloseModal()
        reset()
      })
      .catch(error => {
        console.log('Уведомление об ошибке', error)
      })
  }

  return (
    <>
      <Button variant='gray' size='small' onClick={handleOpenModal} {...props} />

      <UpdateUserModal
        open={isOpenModal}
        methods={methods}
        roleOptions={roleOptions}
        isUserRolesLoading={isUserRolesLoading}
        onClose={handleCloseModal}
        onUpdate={handleSave}
        title='Редактирвать пользователя'
        action='Редактировать'
      />
    </>
  )
}
