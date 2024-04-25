import { SyntheticEvent } from 'react'

export interface UseSearchParamsTabsReturn<TTab> {
  currentTab: TTab
  handleChangeTab: (event: SyntheticEvent, newValue: string) => void
}
