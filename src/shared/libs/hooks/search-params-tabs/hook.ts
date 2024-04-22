import { UseSearchParamsTabsReturn } from '@/shared/libs/hooks/search-params-tabs'
import { SyntheticEvent, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useSearchParamsTabs = (
  tabName: string,
  tabs: Record<string, number>
): UseSearchParamsTabsReturn => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentTab = useMemo(() => {
    const currentTab = searchParams.get(tabName)
    if (!Object.values(tabs).includes(Number(currentTab))) return 0

    return Number(currentTab)
  }, [searchParams, tabName, tabs])

  const handleChangeTab = (_event: SyntheticEvent, newValue: number) => {
    setSearchParams({ [tabName]: newValue.toString() })
  }

  return {
    currentTab,
    handleChangeTab,
  }
}
