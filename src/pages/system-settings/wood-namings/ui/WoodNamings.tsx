import { Box } from '@mui/material'

import { WoodNamingsTable } from '@/widgets/woodNamingTable'
import { CreateWoodNamingButton } from '@/features/wood-naming/create'
import { useFetchAllWoodNamingsQuery } from '@/entities/wood-naming'

export const WoodNamings = () => {
  const { data: woodNamings, isLoading } = useFetchAllWoodNamingsQuery()

  return (
    <Box>
      <Box display={'flex'} flexDirection='column'>
        <CreateWoodNamingButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateWoodNamingButton>

        <WoodNamingsTable woodNamings={woodNamings} isLoadingWoodNamings={isLoading} />
      </Box>
    </Box>
  )
}
