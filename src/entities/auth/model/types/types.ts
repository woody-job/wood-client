import { USER_ROLE } from '@/entities/user'

export type AuthUser = {
  id: number
  login: string
  fullName: string
  role: {
    id: number
    name: USER_ROLE
    description: string
  }
  iat: number
  exp: number
}
