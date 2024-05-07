import { VaultItem } from '@/entities/vault'
import { Box } from '@mui/material'

export const WetWoodVaultStats = () => {
  return (
    <Box display='flex' gap={3} mt={5} flexWrap='wrap'>
      <VaultItem title='Производители' />
      <VaultItem title='Поступило' />
      <VaultItem title='Отгрузили' />
    </Box>
  )
}
