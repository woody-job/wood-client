import { FC, ReactNode, useState } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { UpdateWoodsModal } from '@/entities/wood/ui/UpdateWoodsModal.tsx'
import { ButtonWithConfirm, CustomSunburst, EditIcon } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export interface WoodByDayItemProps {
  title?: string
  addComponent?: ReactNode
  onUpdate?: (id: number) => void
  onDelete?: (id: number) => void
}

export const WoodByDayItem: FC<WoodByDayItemProps> = ({
  addComponent,
  title,
  onDelete,
  onUpdate,
}) => {
  const [openEditId, setOpenEditId] = useState<number>()

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

  const rows = [
    { id: 1, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 2, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 3, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 4, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 5, dimension: '200x47x6', woodClass: '1', amount: 400 },
  ]

  const data = {
    sort: 'root',
    children: [
      {
        sort: '2 сорт',
        amount: 2.433,
      },
      {
        sort: '1 сорт',
        amount: 1.5,
      },
    ],
  }

  return (
    <Box overflow='hidden'>
      <Box display='flex' justifyContent='space-between' mb={3}>
        <Typography>{title}</Typography>

        {addComponent}
      </Box>

      <DataGridContainer height='400px'>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableMultipleRowSelection
          localeText={dataGridLocaleText}
          sx={dataGridStyles}
          hideFooter
          slots={{ panel: CustomGridPanel }}
        />
      </DataGridContainer>

      <Box display='flex' justifyContent='center' width='100%' px={5}>
        <CustomSunburst
          data={data}
          id='sort'
          value='amount'
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
    </Box>
  )
}
