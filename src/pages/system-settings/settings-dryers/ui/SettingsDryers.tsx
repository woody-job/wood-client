import { Box } from '@mui/material'

import { DryersTable } from '@/widgets/dryersTable'
import { CreateDryerButton } from '@/features/dryer/create'
import { useFetchAllDryersQuery } from '@/entities/dryer'

export const SettingsDryers = () => {
  const { data: dryers, isLoading } = useFetchAllDryersQuery()

  return (
    <Box>
      <Box display={'flex'} flexDirection='column'>
        <CreateDryerButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateDryerButton>

        <DryersTable dryers={dryers} isLoadingDryers={isLoading} />
      </Box>
    </Box>
  )
}
