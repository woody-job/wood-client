import { FC } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { UpdatePersonInChargeButton } from '@/features/personInCharge/update'
import { PersonInCharge, useDeletePersonInChargeMutation } from '@/entities/personInCharge'
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

export type PersonsInChargeTableProps = {
  personsInCharge: PersonInCharge[] | undefined
  isLoadingPersonsInCharge: boolean
  onFullscreen?: () => void
  fullscreen?: boolean
}

export const PersonsInChargeTable: FC<PersonsInChargeTableProps> = props => {
  const { personsInCharge, isLoadingPersonsInCharge, onFullscreen, fullscreen } = props

  const [deletePersonInChargeMutation, { isLoading: isLoadingDeletePersonInChargeMutation }] =
    useDeletePersonInChargeMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleDeletePersonInCharge = (personInChargeId: number) => {
    deletePersonInChargeMutation(personInChargeId)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Покупатель успешно удален', { variant: 'info' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const columns: GridColDef[] = [
    { field: 'initials', headerName: 'Инициалы', width: 200 },
    { field: 'secondName', headerName: 'Фамилия', width: 200 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 300,
      renderCell: ({ row }) => (
        <>
          <UpdatePersonInChargeButton personInCharge={row} sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header='Редактировать ответственного'
            description='Вы точно хотите удалить этого ответственного?'
            onConfirm={() => {
              handleDeletePersonInCharge(row.id)
            }}
            isLoading={isLoadingDeletePersonInChargeMutation}
          />
        </>
      ),
    },
  ]

  return (
    <DataGridContainer height={fullscreen ? '100%' : '70vh'}>
      {isLoadingPersonsInCharge && (
        <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}

      {personsInCharge && (
        <DataGrid
          rows={personsInCharge}
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
