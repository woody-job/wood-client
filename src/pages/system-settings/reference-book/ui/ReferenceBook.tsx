import { Box } from '@mui/material'

import { DimensionsSettingsTable } from '@/widgets/dimensionsSettingsTable'
import { useFetchAllDimensionsQuery } from '@/entities/dimension'

export const ReferenceBook = () => {
  const { data: dimensions, isLoading: isLoadingDimensions } = useFetchAllDimensionsQuery()

  return (
    <Box>
      <DimensionsSettingsTable dimensions={dimensions} isLoadingDimensions={isLoadingDimensions} />
    </Box>
  )
}
