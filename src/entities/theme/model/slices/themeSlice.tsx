import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ThemeModes, ThemeStore } from '@/entities/theme/types'
import { storageKeys } from '@/shared/constants'

const loadModeFromLocalStorage = () => {
  const theme = localStorage.getItem(storageKeys.mode)
  if (theme !== 'dark' && theme !== 'light') return 'light'
  return theme
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: loadModeFromLocalStorage(),
  } as ThemeStore,
  reducers: {
    switchMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setMode: (state, action: PayloadAction<ThemeModes>) => {
      state.mode = action.payload
    },
  },
})

export const { switchMode, setMode } = themeSlice.actions
