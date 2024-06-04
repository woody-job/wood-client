import { FC, useMemo } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { WorkshopWoodPricesTableRow } from '@/widgets/workshopSettingsTabs/types'
import { UpdateDimensionPriceButton } from '@/features/dimensions/update-price'
import { useFetchAllDimensionsQuery } from '@/entities/dimension'
import { Workshop } from '@/entities/workshop/model'
import { useFetchWorkshopWoodPricesQuery } from '@/entities/workshop-wood-price'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

import { WORKSHOP_WOOD_PRICES_TABLE_COLUMNS } from '../../../constants'

export interface WorkshopWoodPricesTableProps {
  workshop: Workshop
  onFullscreen?: () => void
  fullscreen?: boolean
}

export const WorkshopWoodPricesTable: FC<WorkshopWoodPricesTableProps> = ({
  workshop,
  fullscreen,
  onFullscreen,
}) => {
  const { id } = workshop

  const { data: workshopWoodPrices, isLoading: isLoadingWorkshopWoodPrices } =
    useFetchWorkshopWoodPricesQuery({ workshopId: id })

  const { data: dimensions, isLoading: isLoadingDimensions } = useFetchAllDimensionsQuery(undefined)

  const columns: GridColDef[] = [
    ...WORKSHOP_WOOD_PRICES_TABLE_COLUMNS,
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: params => {
        return (
          <Box sx={{ ml: 'auto' }}>
            <UpdateDimensionPriceButton workshopId={workshop.id} workshopWoodPrice={params.row} />
          </Box>
        )
      },
    },
  ]

  const rows: WorkshopWoodPricesTableRow[] = useMemo(() => {
    return dimensions && workshopWoodPrices
      ? dimensions?.map(dimension => {
          const existingWorkshopWoodPriceForDimension = workshopWoodPrices.find(
            workshopWoodPrice => {
              return workshopWoodPrice.dimension.id === dimension.id
            }
          )

          const dimensionString = `${dimension.width}x${dimension.thickness}x${dimension.length}`

          return {
            id: dimension.id,
            dimension: dimensionString,
            woodClass: dimension.woodClass.name,
            price: existingWorkshopWoodPriceForDimension
              ? `${existingWorkshopWoodPriceForDimension.price}`
              : undefined,
          }
        })
      : []
  }, [dimensions, workshopWoodPrices])

  return (
    <DataGridContainer
      height={fullscreen ? '100%' : 660}
      mt={fullscreen ? 0 : 5}
      display='flex'
      flexDirection='column'
    >
      <Typography
        variant='subtitle1'
        fontWeight='bold'
        mb='15px'
        sx={{ paddingLeft: '24px', paddingTop: '24px' }}
      >
        Цены
      </Typography>

      {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}

      {(isLoadingWorkshopWoodPrices || isLoadingDimensions) && (
        <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {dimensions && workshopWoodPrices && (
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableMultipleRowSelection
          localeText={dataGridLocaleText}
          sx={{ ...dataGridStyles }}
          hideFooter
          slots={{ panel: CustomGridPanel }}
        />
      )}
    </DataGridContainer>
  )
}
