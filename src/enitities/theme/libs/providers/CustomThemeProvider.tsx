import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material'
import { useAppSelector } from '@/app/store.ts'
import { getThemeSettings } from '@/enitities/theme'
import { FC, ReactNode, useMemo } from 'react'

export interface CustomThemeProviderProps {
  children?: ReactNode
}

export const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
  const { mode } = useAppSelector(state => state.theme)
  const theme = useMemo(() => createTheme(getThemeSettings(mode)), [mode])

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
