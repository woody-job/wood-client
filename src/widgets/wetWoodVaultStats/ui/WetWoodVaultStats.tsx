import { Box } from '@mui/material'

import { VaultItem } from '@/entities/vault'

export const WetWoodVaultStats = () => {
  return (
    <Box display='flex' gap={3} mt={5} flexWrap='wrap' justifyContent='space-evenly'>
      <VaultItem title='Производители' />
      <VaultItem title='Поступило' />
      <VaultItem title='Отгрузили' />
    </Box>
  )
}
