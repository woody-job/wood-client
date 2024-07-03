import { FC, useState } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'

import { AddWoodsArrival } from '@/features/arrival/add'
import { DeleteArrivalButton } from '@/features/arrival/delete'
import { UpdateArrivalButton } from '@/features/arrival/update'
import { useAuth } from '@/entities/auth'
import { USER_ROLE } from '@/entities/user'
import { useFetchWoodArrivalByDayQuery } from '@/entities/wood-arrival'
import { TableFullscreen } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export interface WoodArrivalByDayProps {
  title?: string
  selectedDate: string
  woodConditionId: number
}

export const WoodArrivalByDay: FC<WoodArrivalByDayProps> = ({
  title,
  selectedDate,
  woodConditionId,
}) => {
  const [openEditId, setOpenEditId] = useState<number>()

  const user = useAuth()

  const isAdmin = user?.role.name === USER_ROLE.SUPERADMIN || user?.role.name === USER_ROLE.ADMIN

  const { data: woodArrival, isLoading: isLoadingWoodArrival } = useFetchWoodArrivalByDayQuery({
    woodConditionId,
    date: selectedDate,
  })

  const handleOpenModal = (id: number) => setOpenEditId(id)
  const handleCloseModal = () => setOpenEditId(undefined)

  const columns: GridColDef[] = [
    { field: 'supplier', headerName: 'Поставщик', flex: 0.5 },
    { field: 'car', headerName: 'Машина', flex: 0.5 },
    { field: 'dimension', headerName: 'Сечение', flex: 0.5 },
    { field: 'woodClass', headerName: 'Сорт', flex: 0.5 },
    { field: 'amount', headerName: 'Кол-во', flex: 0.5 },
    { field: 'volume', headerName: 'Объем. м3', flex: 0.5 },
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
                <UpdateArrivalButton
                  onClick={() => handleOpenModal(id as number)}
                  isOpen={openEditId === id}
                  onClose={handleCloseModal}
                  arrivalId={id as number}
                  dimension={row.dimension}
                  woodClass={row.woodClass}
                  amount={row.amount}
                />
                <DeleteArrivalButton id={id as number} onClose={handleCloseModal} />
              </Box>
            ),
          },
        ]
      : []),
  ]

  return (
    <Box overflow='hidden' mt={3}>
      <Box display='flex' justifyContent='space-between' mb={1}>
        <Typography variant='h6'>{title}</Typography>

        {isAdmin && (
          <AddWoodsArrival
            woodConditionId={woodConditionId}
            title='Добавить доски на поступление'
            selectedDate={selectedDate}
          />
        )}
      </Box>

      <TableFullscreen
        renderTable={({ fullscreen, onFullscreen }) => (
          <DataGridContainer height={fullscreen ? '100%' : '60vh'}>
            {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}
            {isLoadingWoodArrival && (
              <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
                <CircularProgress size={100} />
              </Box>
            )}
            {woodArrival?.tableData && (
              <DataGrid
                rows={woodArrival.tableData}
                columns={columns}
                disableRowSelectionOnClick
                disableMultipleRowSelection
                localeText={dataGridLocaleText}
                sx={dataGridStyles}
                hideFooter
                slots={{ panel: CustomGridPanel }}
              />
            )}
          </DataGridContainer>
        )}
      />
      <Typography sx={{ mt: 0.5, mb: 2 }}>Всего м3: {woodArrival?.totalVolume}</Typography>
    </Box>
  )
}
