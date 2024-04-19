import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeModes, ThemeStore } from '@/enitities/theme/types'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
  } as ThemeStore,
  reducers: {
    switchTheme: (state, action: PayloadAction<ThemeModes>) => {
      state.mode = action.payload
    },
  },
})

export const { switchTheme } = themeSlice.actions
