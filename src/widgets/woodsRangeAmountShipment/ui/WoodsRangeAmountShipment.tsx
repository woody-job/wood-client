import { FC, useEffect, useMemo } from 'react'

import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { getDimensionString } from '@/entities/dimension/index.ts'
import { useFetchWoodShipmentByTimeRangeQuery } from '@/entities/wood-shipment/index.ts'
import { defaultErrorHandler } from '@/shared/libs/helpers/defaultErrorHandler.ts'
import { CommonErrorType } from '@/shared/types/error.ts'
import { TimeRange } from '@/shared/types/types.ts'
import {
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
} from '@/shared/ui/data-grid/index.ts'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar.tsx'
import { CustomGridPanel, dataGridStyles, TableFullscreen } from '@/shared/ui/index.ts'

import { WOOD_SHIPMENT_TIME_RANGE_TABLE_COLUMNS } from '../constants'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'

export type WoodsRangeAmountProps = {
  timeRange: TimeRange
}

export const WoodsRangeAmountShipment: FC<WoodsRangeAmountProps> = ({ timeRange }) => {
  const {
    data: woodShipmentData,
    isLoading: isLoadingWoodShipmentData,
    isError,
    error,
  } = useFetchWoodShipmentByTimeRangeQuery({
    startDate: timeRange.startDate.toISOString(),
    endDate: timeRange.endDate.toISOString(),
  })

  useEffect(() => {
    if (!isError) {
      return
    }

    defaultErrorHandler(error as CommonErrorType, message =>
      enqueueSnackbar(message, { variant: 'error' })
    )
  }, [isError])

  const rows = useMemo(() => {
    if (!woodShipmentData?.data) {
      return []
    }

    return woodShipmentData.data.map(woodShipmentDataItem => {
      const {
        id,
        date,
        buyer,
        personInCharge,
        car,
        amount,
        woodClass,
        woodType,
        woodCondition,
        dimension,
        dimensionForSale,
      } = woodShipmentDataItem

      return {
        id,
        date: dayjs(date).format('DD.MM.YYYY'),
        buyer: buyer ? buyer.name : null,
        personInCharge: personInCharge
          ? `${personInCharge.initials} ${personInCharge.secondName}`
          : null,
        car: car ? car : null,
        amount,
        woodClass: woodClass.name,
        woodType: woodType.name,
        dimension: getDimensionString(dimension),
        dimensionForSale: dimensionForSale ? getDimensionString(dimensionForSale) : null,
        volume: Number((dimension.volume * amount).toFixed(2)),
        woodCondition: woodCondition.name,
      }
    })
  }, [woodShipmentData])

  return (
    <Box>
      <TableFullscreen
        renderTable={({ fullscreen, onFullscreen }) => (
          <DataGridContainer
            sx={{
              display: 'flex',
              backgroundColor: theme =>
                theme.palette.mode === 'light' ? theme.background.main : theme.white[100],
            }}
            height={fullscreen ? '100%' : '70vh'}
          >
            {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}
            <DataGrid
              columns={WOOD_SHIPMENT_TIME_RANGE_TABLE_COLUMNS}
              rows={rows}
              disableRowSelectionOnClick
              disableMultipleRowSelection
              localeText={dataGridLocaleText}
              sx={{ ...dataGridStyles, width: 400 }}
              hideFooter
              // @eslint-ignore
              // @ts-expect-error 'error occured'
              slots={{ panel: CustomGridPanel, toolbar: CustomToolbar }}
              slotProps={{
                toolbar: {
                  excelFileName: 'отгрузки',
                },
              }}
              loading={isLoadingWoodShipmentData}
            />
          </DataGridContainer>
        )}
      />
      <Typography mt={2}>Всего м3: {woodShipmentData?.totalVolume}</Typography>
    </Box>
  )
}
