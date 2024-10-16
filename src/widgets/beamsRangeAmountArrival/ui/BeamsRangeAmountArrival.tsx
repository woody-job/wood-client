import { FC, useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { useFetchBeamArrivalByTimeRangeQuery } from '@/entities/beam-arrival'
import { getDeliveryMethodText } from '@/entities/beam-arrival/libs/helpers'
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

import { BEAM_SHIPMENT_TIME_RANGE_TABLE_COLUMNS } from '../constants'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { TableTotalInfo } from '@/shared/ui/tableTotalInfo'

export type BeamsRangeAmountProps = {
  timeRange: TimeRange
}

export const BeamsRangeAmountArrival: FC<BeamsRangeAmountProps> = ({ timeRange }) => {
  const {
    data: beamArrivalData,
    isLoading: isLoadingBeamArrivalData,
    isError,
    error,
  } = useFetchBeamArrivalByTimeRangeQuery({
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
    if (!beamArrivalData?.data) {
      return []
    }

    return beamArrivalData.data.map(beamArrival => {
      return {
        id: beamArrival.id,
        party: beamArrival.partyNumber ? `Партия-${beamArrival.partyNumber}` : null,
        date: dayjs(beamArrival.date).format('DD.MM.YYYY'),
        supplier: beamArrival.supplier?.name,
        deliveryMethod: beamArrival.deliveryMethod
          ? getDeliveryMethodText(beamArrival.deliveryMethod)
          : null,
        supplierId: beamArrival.supplier?.id,
        woodType: beamArrival.woodType.name,
        woodNaming: beamArrival.woodNaming.name,
        woodTypeId: beamArrival.woodType.id,
        amount: beamArrival.amount,
        diameter: beamArrival.beamSize?.diameter,
        volume: beamArrival.volume,
      }
    })
  }, [beamArrivalData])

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
              columns={BEAM_SHIPMENT_TIME_RANGE_TABLE_COLUMNS}
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
                  excelFileName: 'поступления-сырья',
                },
              }}
              loading={isLoadingBeamArrivalData}
            />
          </DataGridContainer>
        )}
      />
      <TableTotalInfo
        totalVolume={beamArrivalData?.totalVolume}
        totalAmount={beamArrivalData?.totalAmount}
      />
    </Box>
  )
}
