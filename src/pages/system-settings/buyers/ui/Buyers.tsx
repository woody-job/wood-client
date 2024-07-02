import { Box } from '@mui/material'

import { BuyersTable } from '@/widgets/buyersTable'
import { CreateBuyerButton } from '@/features/buyer/create'
import { useFetchAllBuyersQuery } from '@/entities/buyer'
import { TableFullscreen } from '@/shared/ui'

export const Buyers = () => {
  const { data: buyers, isLoading } = useFetchAllBuyersQuery()

  return (
    <Box>
      <Box display={'flex'} flexDirection='column'>
        <CreateBuyerButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateBuyerButton>

        <TableFullscreen
          renderTable={props => (
            <BuyersTable buyers={buyers} isLoadingBuyers={isLoading} {...props} />
          )}
        />
      </Box>
    </Box>
  )
}
