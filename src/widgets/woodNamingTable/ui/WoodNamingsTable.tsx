import { FC } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { UpdateWoodNamingButton } from '@/features/wood-naming/update'
import { useDeleteWoodNamingMutation, WoodNaming } from '@/entities/wood-naming'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

import { useSnackbar } from 'notistack'

export type WoodNamingsTableProps = {
  woodNamings: WoodNaming[] | undefined
  isLoadingWoodNamings: boolean
}

export const WoodNamingsTable: FC<WoodNamingsTableProps> = props => {
  const { woodNamings, isLoadingWoodNamings } = props

  const [deleteWoodNamingMutation] = useDeleteWoodNamingMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteWoodNaming = (woodNamingId: number) => {
    deleteWoodNamingMutation(woodNamingId)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Обозначение успешно удалено', { variant: 'info' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Название', width: 200 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 300,
      renderCell: ({ row }) => (
        <>
          <UpdateWoodNamingButton woodNaming={row} sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header='Редактировать обозначение'
            description='Вы точно хотите удалить это обозначение?'
            onConfirm={() => {
              handleDeleteWoodNaming(row.id)
            }}
          />
        </>
      ),
    },
  ]

  return (
    <DataGridContainer>
      {isLoadingWoodNamings && (
        <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {woodNamings && (
        <DataGrid
          rows={woodNamings}
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
