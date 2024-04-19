import { createSlice } from '@reduxjs/toolkit'
import { ThemeStore } from '@/enitities/theme/types'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
  } as ThemeStore,
  reducers: {
    switchTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { switchTheme } = themeSlice.actions
