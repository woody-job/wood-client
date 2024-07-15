import { Box } from '@mui/material'

import { WoodNamingsTable } from '@/widgets/woodNamingTable'
import { CreateWoodNamingButton } from '@/features/wood-naming/create'
import { useFetchAllWoodNamingsQuery } from '@/entities/wood-naming'
import { TableFullscreen } from '@/shared/ui'

export const WoodNamings = () => {
  const { data: woodNamings, isLoading } = useFetchAllWoodNamingsQuery()

  return (
    <Box>
      <Box>
        <CreateWoodNamingButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateWoodNamingButton>

        <TableFullscreen
          renderTable={props => (
            <WoodNamingsTable
              woodNamings={woodNamings}
              isLoadingWoodNamings={isLoading}
              {...props}
            />
          )}
        />
      </Box>
    </Box>
  )
}
