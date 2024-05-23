import { SyntheticEvent, useMemo } from 'react'

import { useSearchParams } from 'react-router-dom'

import { UseSearchParamsTabsReturn } from '@/shared/libs/hooks/search-params-tabs'

export const useSearchParamsTabs = <TTab>(
  tabName: string,
  tabs: TTab[] | undefined,
  tabKeySelector: (tab: TTab) => string,
  defaultTab: TTab
): UseSearchParamsTabsReturn<TTab> => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentTab = useMemo(() => {
    const currentTab = searchParams.get(tabName)

    const findTab = tabs?.find(tab => tabKeySelector(tab) === currentTab)
    if (!findTab) return defaultTab

    return findTab
  }, [defaultTab, searchParams, tabKeySelector, tabName, tabs])

  const handleChangeTab = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams({ [tabName]: newValue })
  }

  return {
    currentTab,
    handleChangeTab,
  }
}
