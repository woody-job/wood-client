import { Box } from '@mui/material'

import { PersonsInChargeTable } from '@/widgets/personsInChargeTable'
import { CreatePersonInChargeButton } from '@/features/personInCharge/create'
import { useFetchAllPersonsInChargeQuery } from '@/entities/personInCharge'
import { TableFullscreen } from '@/shared/ui'

export const PersonsInCharge = () => {
  const { data: personsInCharge, isLoading } = useFetchAllPersonsInChargeQuery()

  return (
    <Box>
      <Box display={'flex'} flexDirection='column'>
        <CreatePersonInChargeButton sx={{ my: 4, alignSelf: 'end' }}>
          Добавить
        </CreatePersonInChargeButton>

        <TableFullscreen
          renderTable={props => (
            <PersonsInChargeTable
              personsInCharge={personsInCharge}
              isLoadingPersonsInCharge={isLoading}
              {...props}
            />
          )}
        />
      </Box>
    </Box>
  )
}
