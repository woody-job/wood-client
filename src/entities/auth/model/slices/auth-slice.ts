import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthUser } from '@/entities/auth'

export const initialState: { user: AuthUser | null } = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = null
    },
  },
})
export const { login, logout } = authSlice.actions
