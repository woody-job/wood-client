import { FC, useMemo, useState } from 'react'

import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'

import { AddBeamArrival } from '@/features/beam-arrival/add'
import { DeleteBeamArrivalButton } from '@/features/beam-arrival/delete'
import { UpdateBeamArrivalButton } from '@/features/beam-arrival/update'
import { useAuth } from '@/entities/auth'
import { useFetchBeamArrivalByDayQuery } from '@/entities/beam-arrival'
import { getDeliveryMethodText } from '@/entities/beam-arrival/libs/helpers'
import { USER_ROLE } from '@/entities/user'
import { TableFullscreen } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'
import { TableTotalInfo } from '@/shared/ui/tableTotalInfo'

export type BeamsDayAmountArrivalProps = {
  selectedDate: string
}

export const BeamsDayAmountArrival: FC<BeamsDayAmountArrivalProps> = ({ selectedDate }) => {
  const [openEditId, setOpenEditId] = useState<number>()

  const user = useAuth()

  const isAdmin = user?.role.name === USER_ROLE.SUPERADMIN || user?.role.name === USER_ROLE.ADMIN

  const { data: beamArrivalData, isLoading: isLoadingBeamArrival } = useFetchBeamArrivalByDayQuery({
    date: selectedDate,
  })

  const handleOpenModal = (id: number) => setOpenEditId(id)
  const handleCloseModal = () => setOpenEditId(undefined)

  const columns: GridColDef[] = [
    { field: 'party', headerName: 'Партия', flex: 0.5 },
    { field: 'supplier', headerName: 'Поставщик', flex: 0.5 },
    { field: 'deliveryMethod', headerName: 'Способ доставки', flex: 0.5 },
    { field: 'woodNaming', headerName: 'Условное обозначение', flex: 0.5 },
    { field: 'woodType', headerName: 'Порода', flex: 0.5 },
    { field: 'amount', headerName: 'Кол-во', flex: 0.5 },
    { field: 'diameter', headerName: 'Диаметр, см', flex: 0.5 },
    { field: 'volume', headerName: 'Объем, м3', flex: 0.5 },
    ...(isAdmin
      ? [
          {
            field: 'actions',
            headerName: '',
            disableColumnMenu: true,
            sortable: false,
            width: 100,
            renderCell: ({ id, row }: GridCellParams) => (
              <Box sx={{ ml: 'auto' }}>
                <UpdateBeamArrivalButton
                  onClick={() => handleOpenModal(id as number)}
                  isOpen={openEditId === id}
                  onClose={handleCloseModal}
                  beamArrivalId={id as number}
                  amount={row.amount}
                  volume={row.volume}
                />
                <DeleteBeamArrivalButton id={id as number} onClose={handleCloseModal} />
              </Box>
            ),
          },
        ]
      : []),
  ]

  const rows = useMemo(() => {
    if (!beamArrivalData?.data) {
      return []
    }

    return beamArrivalData.data.map(beamArrival => {
      return {
        id: beamArrival.id,
        party: beamArrival.partyNumber ? `Партия-${beamArrival.partyNumber}` : null,
        supplier: beamArrival.supplier?.name,
        deliveryMethod: beamArrival.deliveryMethod
          ? getDeliveryMethodText(beamArrival.deliveryMethod)
          : null,
        supplierId: beamArrival.supplier?.id,
        woodType: beamArrival.woodType.name,
        woodNaming: beamArrival.woodNaming.name,
        woodTypeId: beamArrival.woodType.id,
        amount: beamArrival.amount,
        diameter: beamArrival.beamSize?.diameter,
        volume: beamArrival.volume,
      }
    })
  }, [beamArrivalData])

  return (
    <Box overflow='hidden' mt={3}>
      <Box display='flex' justifyContent='flex-end' mb={1}>
        {isAdmin && (
          <AddBeamArrival
            title='Добавить партию бревен на поступление'
            selectedDate={selectedDate}
          />
        )}
      </Box>

      <TableFullscreen
        renderTable={({ fullscreen, onFullscreen }) => (
          <DataGridContainer height={fullscreen ? '100%' : '60vh'}>
            {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}

            {isLoadingBeamArrival && (
              <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
                <CircularProgress size={100} />
              </Box>
            )}
            {beamArrivalData?.data && (
              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                disableMultipleRowSelection
                localeText={dataGridLocaleText}
                sx={dataGridStyles}
                hideFooter
                // @eslint-ignore
                // @ts-expect-error 'error occured'
                slots={{ panel: CustomGridPanel, toolbar: CustomToolbar }}
                slotProps={{ toolbar: { withExcelExport: false } }}
              />
            )}
          </DataGridContainer>
        )}
      />
      <TableTotalInfo
        totalVolume={beamArrivalData?.totalVolume}
        totalAmount={beamArrivalData?.totalAmount}
      />
    </Box>
  )
}
