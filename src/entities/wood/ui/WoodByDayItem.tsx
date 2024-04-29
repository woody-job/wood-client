import { CustomSunburst } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC, ReactNode } from 'react'

export interface WoodByDayItemProps {
  title?: string
  action?: ReactNode
  data?: unknown
}

export const WoodByDayItem: FC<WoodByDayItemProps> = ({ action, title }) => {
  const columns: GridColDef[] = [
    { field: 'dimension', headerName: 'Сечение', width: 170 },
    { field: 'woodClass', headerName: 'Сорт', width: 170 },
    { field: 'amount', headerName: 'Кол-во', width: 170 },
  ]

  const rows = [
    { id: 1, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 2, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 3, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 4, dimension: '200x47x6', woodClass: '1', amount: 400 },
    { id: 5, dimension: '200x47x6', woodClass: '1', amount: 400 },
  ]

  const data = {
    name: 'root',
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
    <Box>
      <Box display='flex' justifyContent='space-between' mb={3}>
        <Typography>{title}</Typography>

        {action}
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

      <Box display='flex' justifyContent='center' width='100%' px={3}>
        <CustomSunburst data={data} id='sort' value='amount'>
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
