import { jwtDecode } from 'jwt-decode'

export const parseJWT = (token: string): unknown => {
  try {
    return jwtDecode(token)
  } catch {
    return null
  }
}
