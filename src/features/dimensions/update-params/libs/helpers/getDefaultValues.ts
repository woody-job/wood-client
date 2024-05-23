import { DimensionsTableRow } from '@/widgets/dimensionsSettingsTable/types'

export const getDefaultValues = (dimension: DimensionsTableRow) => {
  return {
    width: dimension.width,
    thickness: dimension.thickness,
    length: dimension.length,
    woodClass: dimension.woodClass,
  }
}
