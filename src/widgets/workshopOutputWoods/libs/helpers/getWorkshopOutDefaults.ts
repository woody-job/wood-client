import { Dimension, getDimensionString } from '@/entities/dimension'
import { WoodType } from '@/entities/wood-type'

import {
  FIRST_WORKSHOP_DEFAULT_DIMENSIONS,
  SECOND_WORKSHOP_DEFAULT_DIMENSIONS,
  THIRD_WORKSHOP_DEFAULT_DIMENSIONS,
} from '../../constants'
import {
  DimensionWithWoodType,
  WorkshopDefaultDimension,
  WorkshopOutTableRow,
} from '../../types/types'

const getDimensionsForEachWoodType = (dimensions: Dimension[], woodTypes: WoodType[]) => {
  const output: DimensionWithWoodType[] = []

  dimensions.forEach(dimension => {
    woodTypes.forEach(woodType => {
      output.push({
        ...dimension,
        woodType,
      })
    })
  })

  return output
}

const getWorkshopOutDefaultRows = ({
  dimensions,
  woodTypes,
  workshopDefaultDimensions,
}: {
  dimensions: Dimension[]
  woodTypes: WoodType[]
  workshopDefaultDimensions: WorkshopDefaultDimension[]
}): WorkshopOutTableRow[] => {
  const dimensionsWithWoodTypes = getDimensionsForEachWoodType(dimensions, woodTypes)

  const filteredDimensions = dimensionsWithWoodTypes.filter(dimension => {
    const isInDefaultDimensions = workshopDefaultDimensions.find(defaultDimension => {
      const areSizesEqual =
        defaultDimension.width === dimension.width &&
        defaultDimension.thickness === dimension.thickness &&
        defaultDimension.length === dimension.length

      const containsWoodClass = defaultDimension.woodClassesNames.find(woodClassName => {
        return woodClassName === dimension.woodClass.name
      })

      return areSizesEqual && containsWoodClass
    })

    return isInDefaultDimensions
  })

  return filteredDimensions.map(dimension => {
    return {
      // Попытка создать уникальный id без uuid :)
      id: Number(`${dimension.id}${dimension.woodType.id}${dimension.width}${dimension.length}`),
      woodClass: dimension.woodClass.name,
      woodClassId: dimension.woodClass.id,
      dimension: getDimensionString(dimension),
      dimensionId: dimension.id,
      woodType: dimension.woodType.name,
      woodTypeId: dimension.woodType.id,
      amount: undefined,
      workshopOutId: undefined,
      isEmptyDefault: true,
    }
  })
}

export const getWorkshopOutDefaults = ({
  dimensions,
  woodTypes,
  workshopId,
}: {
  dimensions: Dimension[]
  woodTypes: WoodType[]
  workshopId: string
}) => {
  switch (workshopId) {
    case '1':
      return getWorkshopOutDefaultRows({
        dimensions,
        woodTypes,
        workshopDefaultDimensions: FIRST_WORKSHOP_DEFAULT_DIMENSIONS,
      })
    case '2':
      return getWorkshopOutDefaultRows({
        dimensions,
        woodTypes,
        workshopDefaultDimensions: SECOND_WORKSHOP_DEFAULT_DIMENSIONS,
      })
    case '3':
      return getWorkshopOutDefaultRows({
        dimensions,
        woodTypes,
        workshopDefaultDimensions: THIRD_WORKSHOP_DEFAULT_DIMENSIONS,
      })
    default:
      return []
  }
}
