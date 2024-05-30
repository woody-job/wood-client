import { WorkshopOutStat } from '@/entities/workshop-out'
import { getRussianDayAndMonth } from '@/shared/libs/helpers'

export type MapDataToWoodsBarReturnItem = {
  day: string
} & Record<string, string>

export const mapDataToWoodsBar = (
  data: WorkshopOutStat[]
): {
  items: MapDataToWoodsBarReturnItem[]
  keys: string[]
} => {
  const keys = new Set<string>()

  const result = data.map(item => {
    return {
      day: getRussianDayAndMonth(item.date),
      ...item.woods.reduce((prevItem, currentItem) => {
        keys.add(currentItem.name)
        return { ...prevItem, [currentItem.name]: currentItem.percentage }
      }, {}),
    }
  })
  return {
    items: result,
    keys: [...keys],
  }
}
