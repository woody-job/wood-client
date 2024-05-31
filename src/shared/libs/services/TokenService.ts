import { storageKeys } from '@/shared/constants'

class TokenService {
  public getToken(): string | null {
    return localStorage.getItem(storageKeys.token)
  }

  public setToken(token: string) {
    localStorage.setItem(storageKeys.token, token)
  }
  public removeToken() {
    localStorage.removeItem(storageKeys.token)
  }
}

export default new TokenService()
