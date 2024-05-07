import { FC, ReactNode, useMemo } from 'react'

import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material'
import { bgBG } from '@mui/x-data-grid/locales'

import { useAppSelector } from '@/app/store.ts'
import { getThemeSettings } from '@/entities/theme'

export interface CustomThemeProviderProps {
  children?: ReactNode
}

export const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
  const { mode } = useAppSelector(state => state.theme)
  const theme = useMemo(() => createTheme(getThemeSettings(mode), bgBG), [mode])

  return (
    <>
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.background.default },
        }}
      />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}
