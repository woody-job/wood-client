import { FC, useMemo } from 'react'

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
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

import { useSnackbar } from 'notistack'

export type WoodNamingsTableProps = {
  woodNamings: WoodNaming[] | undefined
  isLoadingWoodNamings: boolean
  onFullscreen?: () => void
  fullscreen?: boolean
}

export const WoodNamingsTable: FC<WoodNamingsTableProps> = props => {
  const { woodNamings, isLoadingWoodNamings, onFullscreen, fullscreen } = props

  const [deleteWoodNamingMutation, { isLoading: isLoadingDeleteWoodNamingMutation }] =
    useDeleteWoodNamingMutation()
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
    { field: 'name', headerName: 'Название', flex: 1 },
    { field: 'minDiameter', headerName: 'Мин. диаметр, см', flex: 1 },
    { field: 'maxDiameter', headerName: 'Макс. диаметр, см', flex: 1 },
    { field: 'length', headerName: 'Длина, м', flex: 1 },
    { field: 'woodType', headerName: 'Порода', flex: 1 },
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
            isLoading={isLoadingDeleteWoodNamingMutation}
          />
        </>
      ),
    },
  ]

  const rows = useMemo(() => {
    if (!woodNamings) {
      return []
    }

    return woodNamings.map(woodNaming => {
      return {
        id: woodNaming.id,
        name: woodNaming.name,
        minDiameter: woodNaming.minDiameter,
        maxDiameter: woodNaming.maxDiameter,
        length: woodNaming.length,
        woodType: woodNaming.woodType.name,
        woodTypeId: woodNaming.woodType.id,
      }
    })
  }, [woodNamings])

  return (
    <DataGridContainer height={fullscreen ? '100%' : '70vh'}>
      {isLoadingWoodNamings && (
        <Box sx={{ height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}

      {woodNamings && (
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
      )}
    </DataGridContainer>
  )
}
