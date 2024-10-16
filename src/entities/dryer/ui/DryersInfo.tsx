import { FC, useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { getDimensionString } from '@/entities/dimension'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType, TimeRange } from '@/shared/types'
import { TableFullscreen } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { DataGridContainer } from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'
import { TimeRangeInputs } from '@/shared/ui/time-range'

import { useFetchAllWoodsGoneThroughDryerQuery } from '../api'
import { DRYERS_INFO_TABLE_COLUMNS } from '../constants'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { TableTotalInfo } from '@/shared/ui/tableTotalInfo'

export const DryersInfo: FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
  })

  const handleSetTimeRange = (value: TimeRange) => {
    setTimeRange(value)
  }

  const {
    data: dryerInfoData,
    isLoading: isLoadingDryerInfoData,
    isError,
    error,
  } = useFetchAllWoodsGoneThroughDryerQuery({
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
    if (!dryerInfoData?.data) {
      return []
    }

    return dryerInfoData?.data.map(dryerChamberData => {
      return {
        id: dryerChamberData.id,
        date: dayjs(dryerChamberData.date).format('DD.MM.YYYY'),
        dryerChamberName: dryerChamberData.dryerChamber.name,
        chamberIterationCountWhenBringingIn: dryerChamberData.chamberIterationCountWhenBringingIn,
        dimension: getDimensionString(dryerChamberData.dimension),
        woodClass: dryerChamberData.woodClass.name,
        woodType: dryerChamberData.woodType.name,
        amount: dryerChamberData.amount,
        volume: Number((dryerChamberData.dimension.volume * dryerChamberData.amount).toFixed(2)),
      }
    })
  }, [dryerInfoData])

  return (
    <Box>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

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
              columns={DRYERS_INFO_TABLE_COLUMNS}
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
                  excelFileName: 'вход-в-сушилки',
                },
              }}
              loading={isLoadingDryerInfoData}
            />
          </DataGridContainer>
        )}
      />
      <TableTotalInfo
        totalVolume={dryerInfoData?.totalVolume}
        totalAmount={dryerInfoData?.totalAmount}
      />
    </Box>
  )
}
