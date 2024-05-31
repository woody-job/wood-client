export type AuthUser = {
  id: number
  login: string
  fullName: string
  role: {
    id: number
    name: string
    description: string
  }
  iat: number
  exp: number
}
