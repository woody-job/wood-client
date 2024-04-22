import { SyntheticEvent } from 'react'

export interface UseSearchParamsTabsReturn {
  currentTab: number
  handleChangeTab: (event: SyntheticEvent, newValue: number) => void
}
