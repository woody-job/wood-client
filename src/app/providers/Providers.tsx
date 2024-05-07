import { FC, ReactNode } from 'react'

import { Provider } from 'react-redux'

import { AppRouter } from '@/app/routers'
import { store } from '@/app/store'
import { CustomThemeProvider } from '@/entities/theme/libs/providers'

export interface ProviderProps {
  children?: ReactNode
}

export const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <AppRouter />
        {children}
      </CustomThemeProvider>
    </Provider>
  )
}
