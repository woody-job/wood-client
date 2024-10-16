import { Dimension, getDimensionString } from '@/entities/dimension'

export const getUniqueDimensionsFromAllDimensions = (allDimensions: Dimension[]) => {
  const uniqueDimensionNamesOptions: {
    id: number
    label: string
    width: string
  }[] = []

  const allDimensionsWithDuplicates = allDimensions.map(dimension => {
    return {
      id: dimension.id,
      label: getDimensionString(dimension),
      width: `${dimension.width}`,
    }
  })

  allDimensionsWithDuplicates.forEach(dimensionOption => {
    const existentDimensionOption = uniqueDimensionNamesOptions.find(
      option => option.label === dimensionOption.label
    )

    if (!existentDimensionOption) {
      uniqueDimensionNamesOptions.push(dimensionOption)
    }
  })

  return uniqueDimensionNamesOptions
}
