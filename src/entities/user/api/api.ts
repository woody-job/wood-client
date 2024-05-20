import { baseApi } from '@/shared/api'
import { ResponseWithToken } from '@/shared/types/types'

import {
  CreateUserParams,
  DeleteUserParams,
  LoginParams,
  UpdateUserParams,
  User,
  UserRole,
} from '../model'

export const userAuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllUsers: build.query<User[], void>({
      query: () => ({
        url: 'users/list',
      }),
      providesTags: ['AllUsers'],
    }),

    fetchAllRoles: build.query<UserRole[], void>({
      query: () => ({
        url: 'roles/list',
      }),
      providesTags: ['Roles'],
    }),

    // Регистрация
    createUser: build.mutation<ResponseWithToken, CreateUserParams>({
      query: createUserParams => ({
        url: 'auth/register',
        method: 'POST',
        body: createUserParams,
      }),
      invalidatesTags: ['AllUsers'],
    }),

    // Вход
    login: build.mutation<ResponseWithToken, LoginParams>({
      query: loginParams => ({
        url: 'auth/login',
        method: 'POST',
        body: loginParams,
      }),
    }),

    updateUser: build.mutation<User, UpdateUserParams>({
      query: ({ userId, userData }) => ({
        url: `auth/edit-user/${userId}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['AllUsers'],
    }),

    deleteUser: build.mutation<void, DeleteUserParams>({
      query: ({ userId }) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AllUsers'],
    }),
  }),
})

export const {
  useFetchAllUsersQuery,
  useFetchAllRolesQuery,
  useCreateUserMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userAuthApi
