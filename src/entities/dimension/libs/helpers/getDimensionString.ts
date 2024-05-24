import { Dimension } from '@/entities/dimension'

export const getDimensionString = (dimension: Dimension): string => {
  return `${dimension.width}x${dimension.thickness}x${dimension.length}`
}
