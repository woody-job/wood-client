import { Dimension, getDimensionString } from '@/entities/dimension'

export const getUniqueDimensionsFromAllDimensions = (allDimensions: Dimension[]) => {
  const uniqueDimensionNamesOptions: {
    id: number
    name: string
  }[] = []

  const allDimensionsWithDuplicates = allDimensions.map(dimension => {
    return {
      id: dimension.id,
      name: getDimensionString(dimension),
    }
  })

  allDimensionsWithDuplicates.forEach(dimensionOption => {
    const existentDimensionOption = uniqueDimensionNamesOptions.find(
      option => option.name === dimensionOption.name
    )

    if (!existentDimensionOption) {
      uniqueDimensionNamesOptions.push(dimensionOption)
    }
  })

  return uniqueDimensionNamesOptions
}
