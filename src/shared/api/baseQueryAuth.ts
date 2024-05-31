import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { logout } from '@/entities/auth'
import { baseQuery } from '@/shared/api/baseQuery.ts'
import { TokenService } from '@/shared/libs/services'
import { urls } from '../constants'

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const accessToken = TokenService.getToken()

  const newArgs = typeof args === 'string' ? { url: args } : args

  const result = await baseQuery(
    {
      ...newArgs,
      headers: {
        Authorization: `Bearer ${accessToken ?? ''}`,
      },
    },
    api,
    extraOptions
  )

  if ((result.error && result.error.status === 401) || !accessToken) {
    api.dispatch(logout())
    TokenService.removeToken()

    window.location.href = `/${urls.login}`
  }

  return result
}
