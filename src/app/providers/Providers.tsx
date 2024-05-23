import { FC, ReactNode } from 'react'

import { Provider } from 'react-redux'

import { AppRouter } from '@/app/routers'
import { store } from '@/app/store'
import { CustomThemeProvider } from '@/entities/theme/libs/providers'

import { SnackbarProvider } from 'notistack'

export interface ProviderProps {
  children?: ReactNode
}

export const Providers: FC<ProviderProps> = ({ children }) => {
  return (
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
  )
}
