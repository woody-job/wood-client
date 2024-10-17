import { FC, useMemo, useState } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'

import { AddBeamShipment } from '@/features/beam-shipment/add'
import { DeleteBeamShipmentButton } from '@/features/beam-shipment/delete'
import { UpdateBeamShipmentButton } from '@/features/beam-shipment/update'
import { useAuth } from '@/entities/auth'
import { useFetchBeamShipmentByDayQuery } from '@/entities/beam-shipment'
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

export type BeamsDayAmountShipmentProps = {
  selectedDate: string
}

export const BeamsDayAmountShipment: FC<BeamsDayAmountShipmentProps> = ({ selectedDate }) => {
  const [openEditId, setOpenEditId] = useState<number>()

  const user = useAuth()

  const isAdmin = user?.role.name === USER_ROLE.SUPERADMIN || user?.role.name === USER_ROLE.ADMIN

  const { data: beamShipmentData, isLoading: isLoadingBeamShipment } =
    useFetchBeamShipmentByDayQuery({
      date: selectedDate,
    })

  const handleOpenModal = (id: number) => setOpenEditId(id)
  const handleCloseModal = () => setOpenEditId(undefined)

  const columns: GridColDef[] = [
    { field: 'buyer', headerName: 'Покупатель', flex: 0.5 },
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
                <UpdateBeamShipmentButton
                  onClick={() => handleOpenModal(id as number)}
                  isOpen={openEditId === id}
                  onClose={handleCloseModal}
                  beamShipmentId={id as number}
                  amount={row.amount}
                  volume={row.volume}
                />
                <DeleteBeamShipmentButton id={id as number} onClose={handleCloseModal} />
              </Box>
            ),
          },
        ]
      : []),
  ]

  const rows = useMemo(() => {
    if (!beamShipmentData?.data) {
      return []
    }

    return beamShipmentData.data.map(beamShipment => {
      return {
        id: beamShipment.id,
        buyer: beamShipment.buyer?.name,
        buyerId: beamShipment.buyer?.id,
        woodType: beamShipment.woodType.name,
        woodNaming: beamShipment.woodNaming.name,
        woodTypeId: beamShipment.woodType.id,
        amount: beamShipment.amount,
        diameter: beamShipment.beamSize?.diameter,
        volume: beamShipment.volume,
      }
    })
  }, [beamShipmentData])

  return (
    <Box overflow='hidden' mt={3}>
      <Box display='flex' justifyContent='flex-end' mb={1}>
        {isAdmin && (
          <AddBeamShipment title='Добавить партию бревен на отгрузку' selectedDate={selectedDate} />
        )}
      </Box>

      <TableFullscreen
        renderTable={({ fullscreen, onFullscreen }) => (
          <DataGridContainer height={fullscreen ? '100%' : '60vh'}>
            {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}

            {isLoadingBeamShipment && (
              <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
                <CircularProgress size={100} />
              </Box>
            )}
            {beamShipmentData?.data && (
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
        totalVolume={beamShipmentData?.totalVolume}
        totalAmount={beamShipmentData?.totalAmount}
      />
    </Box>
  )
}
