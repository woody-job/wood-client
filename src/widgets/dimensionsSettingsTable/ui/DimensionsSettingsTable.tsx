import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { CreateDimensionButton } from '@/features/dimensions/create'
import { UpdateDimensionParamsButton } from '@/features/dimensions/update-params'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { DIMENSIONS_TABLE_COLUMNS } from '../constants'
import { FC, useMemo } from 'react'
import { Dimension, useDeleteDimensionMutation } from '@/entities/dimension'
import { DimensionsTableRow } from '../types'

type DimensionsSettingsTableProps = {
  dimensions: Dimension[] | undefined
  isLoadingDimensions: boolean
}

export const DimensionsSettingsTable: FC<DimensionsSettingsTableProps> = ({
  dimensions,
  isLoadingDimensions,
}) => {
  const [deleteDimensionMutation] = useDeleteDimensionMutation()

  const handleDeleteDimension = (dimensionId: number) => {
    deleteDimensionMutation({ dimensionId })
  }

  const columns: GridColDef[] = [
    ...DIMENSIONS_TABLE_COLUMNS,
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ ml: 'auto' }}>
            <UpdateDimensionParamsButton dimension={params.row} sx={{ mr: 1 }} />
            <ButtonWithConfirm
              header='Удалить сечение?'
              description='Вы точно хотите удалить это сечение?'
              onConfirm={() => {
                handleDeleteDimension(params.row.id)
              }}
            />
          </Box>
        )
      },
    },
  ]

  const rows: DimensionsTableRow[] = useMemo(() => {
    return dimensions
      ? dimensions?.map(dimension => {
          return {
            id: dimension.id,
            thickness: dimension.thickness,
            width: dimension.width,
            length: dimension.length,
            woodClass: dimension.woodClass.name,
          }
        })
      : []
  }, [dimensions])

  return (
    <Box display={'flex'} flexDirection='column'>
      <CreateDimensionButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateDimensionButton>

      <DataGridContainer>
        {isLoadingDimensions && (
          <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
            <CircularProgress size={100} />
          </Box>
        )}
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
    </Box>
  )
}
