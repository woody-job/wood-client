import { FC } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { UpdateSupplierButton } from '@/features/supplier/update'
import { Supplier, useDeleteSupplierMutation } from '@/entities/supplier'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

import { useSnackbar } from 'notistack'

export type SuppliersTableProps = {
  suppliers: Supplier[] | undefined
  isLoadingSuppliers: boolean
  onFullscreen?: () => void
  fullscreen?: boolean
}

export const SuppliersTable: FC<SuppliersTableProps> = props => {
  const { suppliers, isLoadingSuppliers, onFullscreen, fullscreen } = props

  const [deleteSupplierMutation, { isLoading: isLoadingDeleteSupplierMutation }] =
    useDeleteSupplierMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteSupplier = (supplierId: number) => {
    deleteSupplierMutation(supplierId)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Поставщик успешно удален', { variant: 'info' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Наименование', width: 200 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 300,
      renderCell: ({ row }) => (
        <>
          <UpdateSupplierButton supplier={row} sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header='Редактировать поставщика'
            description='Вы точно хотите удалить этого поставщика?'
            onConfirm={() => {
              handleDeleteSupplier(row.id)
            }}
            isLoading={isLoadingDeleteSupplierMutation}
          />
        </>
      ),
    },
  ]

  return (
    <DataGridContainer height={fullscreen ? '100%' : '70vh'}>
      {isLoadingSuppliers && (
        <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}

      {suppliers && (
        <DataGrid
          rows={suppliers}
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
