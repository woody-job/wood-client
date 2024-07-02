import { Box } from '@mui/material'

import { SuppliersTable } from '@/widgets/suppliersTable'
import { CreateSupplierButton } from '@/features/supplier/create'
import { useFetchAllSuppliersQuery } from '@/entities/supplier'
import { TableFullscreen } from '@/shared/ui'

export const Suppliers = () => {
  const { data: suppliers, isLoading } = useFetchAllSuppliersQuery()

  return (
    <Box>
      <Box display={'flex'} flexDirection='column'>
        <CreateSupplierButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateSupplierButton>

        <TableFullscreen
          renderTable={props => (
            <SuppliersTable suppliers={suppliers} isLoadingSuppliers={isLoading} {...props} />
          )}
        />
      </Box>
    </Box>
  )
}
