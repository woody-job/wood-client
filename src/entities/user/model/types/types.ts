import { USER_ROLE } from '../../../../entities/user/contansts'

export type UserRole = {
  id: number
  name: USER_ROLE
  description: string
}

export type User = {
  id: number
  login: string
  fullName: string
  password: string // TODO: Не надо так
  roleId: number
  role: UserRole
}

export type CreateUserParams = {
  login: string
  fullName: string
  password: string
  roleId: number
}

export type UpdateUserParams = {
  userId: number
  userData: CreateUserParams
}

export type LoginParams = {
  login: string
  password: string
}

export type DeleteUserParams = {
  userId: number
}

export type UserFormType = {
  firstName: string
  secondName: string
  fatherName: string
  login: string
  role: string
  password: string
  repeatPassword: string
}
