import { FC, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { useFetchBeamShipmentByTimeRangeQuery } from '@/entities/beam-shipment'
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
import { TableTotalInfo } from '@/shared/ui/tableTotalInfo'

import { BEAM_SHIPMENT_TIME_RANGE_TABLE_COLUMNS } from '../constants'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'

export type BeamsRangeAmountProps = {
  timeRange: TimeRange
}

export const BeamsRangeAmountShipment: FC<BeamsRangeAmountProps> = ({ timeRange }) => {
  const {
    data: beamShipmentData,
    isLoading: isLoadingBeamShipmentData,
    isError,
    error,
  } = useFetchBeamShipmentByTimeRangeQuery({
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
    if (!beamShipmentData?.data) {
      return []
    }

    return beamShipmentData.data.map(beamShipment => {
      return {
        id: beamShipment.id,
        date: dayjs(beamShipment.date).format('DD.MM.YYYY'),
        buyer: beamShipment.buyer?.name,
        buyerId: beamShipment.buyer?.id,
        woodType: beamShipment.woodType.name,
        woodNaming: beamShipment.woodNaming.name,
        woodTypeId: beamShipment.woodType.id,
        amount: beamShipment.amount,
        diameter: beamShipment.beamSize?.diameter,
        volume: beamShipment.volume,
      }
    })
  }, [beamShipmentData])

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
                  excelFileName: 'отгрузки-сырья',
                },
              }}
              loading={isLoadingBeamShipmentData}
            />
          </DataGridContainer>
        )}
      />
      <TableTotalInfo
        totalVolume={beamShipmentData?.totalVolume}
        totalAmount={beamShipmentData?.totalAmount}
      />
    </Box>
  )
}
