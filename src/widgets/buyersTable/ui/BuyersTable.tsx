import { FC } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { UpdateBuyerButton } from '@/features/buyer/update'
import { Buyer, useDeleteBuyerMutation } from '@/entities/buyer'
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

export type BuyersTableProps = {
  buyers: Buyer[] | undefined
  isLoadingBuyers: boolean
  onFullscreen?: () => void
  fullscreen?: boolean
}

export const BuyersTable: FC<BuyersTableProps> = props => {
  const { buyers, isLoadingBuyers, onFullscreen, fullscreen } = props

  const [deleteBuyerMutation, { isLoading: isLoadingDeleteBuyerMutation }] =
    useDeleteBuyerMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteBuyer = (buyerId: number) => {
    deleteBuyerMutation(buyerId)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Покупатель успешно удален', { variant: 'info' })
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
          <UpdateBuyerButton buyer={row} sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header='Редактировать покупателя'
            description='Вы точно хотите удалить этого покупателя?'
            onConfirm={() => {
              handleDeleteBuyer(row.id)
            }}
            isLoading={isLoadingDeleteBuyerMutation}
          />
        </>
      ),
    },
  ]

  return (
    <DataGridContainer height={fullscreen ? '100%' : '70vh'}>
      {isLoadingBuyers && (
        <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}

      {buyers && (
        <DataGrid
          rows={buyers}
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
