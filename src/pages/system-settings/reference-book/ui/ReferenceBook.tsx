import { Box } from '@mui/material'

import { DimensionsSettingsTable } from '@/widgets/dimensionsSettingsTable'
import { CreateDimensionButton } from '@/features/dimensions/create'
import { useFetchAllDimensionsQuery } from '@/entities/dimension'
import { TableFullscreen } from '@/shared/ui'

export const ReferenceBook = () => {
  const { data: dimensions, isLoading: isLoadingDimensions } = useFetchAllDimensionsQuery()

  return (
    <Box display={'flex'} flexDirection='column'>
      <CreateDimensionButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateDimensionButton>

      <TableFullscreen
        renderTable={props => (
          <DimensionsSettingsTable
            dimensions={dimensions}
            isLoadingDimensions={isLoadingDimensions}
            {...props}
          />
        )}
      />
    </Box>
  )
}
