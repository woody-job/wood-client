import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { UpdateDryerButton } from '@/features/dryer/update'
import { ButtonWithConfirm } from '@/shared/ui'
import { CustomGridPanel, DataGridContainer, dataGridLocaleText, dataGridStyles } from '@/shared/ui/data-grid'
import { Dryer, useDeleteDryerMutation } from '@/entities/dryer'
import { FC } from 'react'

export type DryersTableProps = {
  dryers: Dryer[] | undefined,
  isLoadingDryers: boolean
}

export const DryersTable: FC<DryersTableProps> = (props) => {
  const { dryers, isLoadingDryers } = props

  const [deleteDryerMutation] = useDeleteDryerMutation()

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Название', width: 200 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: ({ row }) => (
        <Box sx={{ ml: 'auto' }}>
          <UpdateDryerButton dryer={row} sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header={'Удалить сушильную камеру'}
            description={'Вы точно хотите удалить эту сушильнуюд камеру?'}
            onConfirm={() => {
              deleteDryerMutation(row.id)
                .unwrap()
                .then(() => {
                })
                .catch(() => {
                })
            }}
          />
        </Box>
      ),
    },
  ]

  return (
    <DataGridContainer>
      {isLoadingDryers && (
        <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {dryers && (
        <DataGrid
          rows={dryers}
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
  )
}
