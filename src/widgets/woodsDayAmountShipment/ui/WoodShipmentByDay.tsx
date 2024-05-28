import { FC, useState } from 'react'

import { Box, CircularProgress, IconButton, Skeleton, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { AddWoodsShipment } from '@/features/shipment/add'
import { UpdateWoodsModal } from '@/entities/wood/ui/UpdateWoodsModal.tsx'
import { useFetchWoodShipmentQuery } from '@/entities/wood-shipment'
import { ButtonWithConfirm, CustomSunburst, EditIcon } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export interface WoodShipmentByDayProps {
  title?: string
  onUpdate?: (id: number) => void
  onDelete?: (id: number) => void
  selectedDate: string
  woodConditionId: number
}

export const WoodShipmentByDay: FC<WoodShipmentByDayProps> = ({
  title,
  onDelete,
  onUpdate,
  selectedDate,
  woodConditionId,
}) => {
  const [openEditId, setOpenEditId] = useState<number>()

  const { data: woodShipment, isLoading: isLoadingWoodShipment } = useFetchWoodShipmentQuery({
    woodConditionId,
    endDate: selectedDate,
    startDate: selectedDate,
  })

  const handleOpenModal = (id: number) => setOpenEditId(id)
  const handleCloseModal = () => setOpenEditId(undefined)

  const columns: GridColDef[] = [
    { field: 'dimension', headerName: 'Сечение', width: 150 },
    { field: 'woodClass', headerName: 'Сорт', width: 100 },
    { field: 'amount', headerName: 'Кол-во', width: 100 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: ({ id }) => (
        <Box sx={{ ml: 'auto' }}>
          <IconButton onClick={() => handleOpenModal(id as number)}>
            <EditIcon />
          </IconButton>

          <UpdateWoodsModal
            title={'Редактировать'}
            actionTitle={'Редактировать'}
            onSubmit={() => onUpdate?.(id as number)}
            open={openEditId === id}
            onClose={handleCloseModal}
          />
          <ButtonWithConfirm
            header={'Удаление досок'}
            description={'Вы точно хотите удалить?'}
            onConfirm={() => onDelete?.(id as number)}
          />
        </Box>
      ),
    },
  ]

  return (
    <Box overflow='hidden'>
      <Box display='flex' justifyContent='space-between' mb={3}>
        <Typography>{title}</Typography>

        <AddWoodsShipment
          title='Добавить доски на отгрузку'
          woodConditionId={woodConditionId}
          selectedDate={selectedDate}
        />
      </Box>

      <DataGridContainer height='400px' width='600px'>
        {isLoadingWoodShipment && (
          <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
            <CircularProgress size={100} />
          </Box>
        )}
        {woodShipment?.tableData && (
          <DataGrid
            rows={woodShipment.tableData}
            columns={columns}
            disableRowSelectionOnClick
            disableMultipleRowSelection
            localeText={dataGridLocaleText}
            sx={dataGridStyles}
            hideFooter
            slots={{ panel: CustomGridPanel }}
            getRowId={row => row.woodClass + row.dimension}
          />
        )}
      </DataGridContainer>

      {woodShipment && (
        <Box display='flex' justifyContent='center' width='100%' px={5}>
          {isLoadingWoodShipment && <Skeleton variant='circular' width='500px' height='500px' />}
          <CustomSunburst
            data={{ children: woodShipment.sunburstData }}
            id='name'
            value='size'
            arcLabel={({ id }) => `${id}`}
            valueFormat={value => value.toFixed(2) + ' м3'}
            containerProps={{
              width: '500px',
              height: '500px',
            }}
          >
            <Typography variant='h6' textAlign='center'>
              Всего из:
            </Typography>
            <Typography variant='h6' textAlign='center'>
              4.300 м3
            </Typography>
          </CustomSunburst>
        </Box>
      )}
    </Box>
  )
}
