export interface WoodsOldItem {
  day: string
  woods: {
    name: string
    count: number
  }[]
}

export type MapDataToWoodsBarReturnItem = {
  day: string
} & Record<string, string>

export const mapDataToWoodsBar = (
  data: WoodsOldItem[]
): {
  items: MapDataToWoodsBarReturnItem[]
  keys: string[]
} => {
  const keys = new Set<string>()

  const result = data.map(item => {
    return {
      day: item.day,
      ...item.woods.reduce((prevItem, currentItem) => {
        keys.add(currentItem.name)
        return { ...prevItem, [currentItem.name]: currentItem.count }
      }, {}),
    }
  })
  return {
    items: result,
    keys: [...keys],
  }
}
