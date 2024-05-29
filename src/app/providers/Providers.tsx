import { FC, ReactNode } from 'react'

import { Provider } from 'react-redux'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ruRU } from '@mui/x-date-pickers/locales'

import { AppRouter } from '@/app/routers'
import { store } from '@/app/store'
import { CustomThemeProvider } from '@/entities/theme/libs/providers'

import 'dayjs/locale/ru'
import { SnackbarProvider } from 'notistack'

export interface ProviderProps {
  children?: ReactNode
}

export const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale='ru'
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Provider store={store}>
        <CustomThemeProvider>
          <SnackbarProvider
            maxSnack={10}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <AppRouter />
            {children}
          </SnackbarProvider>
        </CustomThemeProvider>
      </Provider>
    </LocalizationProvider>
  )
}
