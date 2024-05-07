import { Box } from '@mui/material'

import { VaultItem } from '@/entities/vault'

export const DryWoodVaultStats = () => {
  return (
    <Box display='flex' gap={3} mt={5} flexWrap='wrap'>
      <VaultItem title='Поступило' />
      <VaultItem title='Отгрузили' />
    </Box>
  )
}
