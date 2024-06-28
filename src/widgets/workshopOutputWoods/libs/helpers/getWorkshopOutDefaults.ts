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

const getDimensionsForEachWoodType = ({
  dimensions,
  woodTypes,
  workshopDefaultDimensions,
}: {
  dimensions: Dimension[]
  woodTypes: WoodType[]
  workshopDefaultDimensions: WorkshopDefaultDimension[]
}) => {
  const output: DimensionWithWoodType[] = []

  workshopDefaultDimensions.forEach(workshopDefaultDimension => {
    const { width, thickness, length } = workshopDefaultDimension

    Object.keys(workshopDefaultDimension.woodParams).forEach(woodClassName => {
      const currentDimension = dimensions.find(dimension => {
        return (
          dimension.width === width &&
          dimension.thickness === thickness &&
          dimension.length === length &&
          dimension.woodClass.name === woodClassName
        )
      })

      const defaultWoodTypes = workshopDefaultDimension.woodParams[woodClassName]

      const currentWoodTypes = defaultWoodTypes.map(defaultWoodType => {
        return woodTypes.find(woodType => woodType.name === defaultWoodType)
      })

      if (!currentDimension || !currentWoodTypes) {
        return
      }

      currentWoodTypes.forEach(currentWoodType => {
        if (!currentWoodType) {
          return
        }

        output.push({
          ...currentDimension,
          woodType: currentWoodType,
        })
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
  const dimensionsWithWoodTypes = getDimensionsForEachWoodType({
    dimensions,
    woodTypes,
    workshopDefaultDimensions,
  })

  const filteredDimensions = dimensionsWithWoodTypes.filter(dimension => {
    const isInDefaultDimensions = workshopDefaultDimensions.find(defaultDimension => {
      const areSizesEqual =
        defaultDimension.width === dimension.width &&
        defaultDimension.thickness === dimension.thickness &&
        defaultDimension.length === dimension.length

      const containsWoodClass = Object.keys(defaultDimension.woodParams).find(woodClassName => {
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
