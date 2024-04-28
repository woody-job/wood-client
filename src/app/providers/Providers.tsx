import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { FC, ReactNode } from 'react'
import { AppRouter } from '@/app/routers'
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
