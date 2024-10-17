import { FC, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { getDimensionString } from '@/entities/dimension'
import { useFetchWoodArrivalByTimeRangeQuery } from '@/entities/wood-arrival'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { TimeRange } from '@/shared/types/types.ts'
import { TableFullscreen } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'
import { TableTotalInfo } from '@/shared/ui/tableTotalInfo'

import { WOOD_ARRIVAL_TIME_RANGE_TABLE_COLUMNS } from '../constants'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'

export type WoodsRangeAmountProps = {
  timeRange: TimeRange
}

export const WoodsRangeAmountArrival: FC<WoodsRangeAmountProps> = ({ timeRange }) => {
  const {
    data: woodArrivalData,
    isLoading: isLoadingWoodArrivalData,
    isError,
    error,
  } = useFetchWoodArrivalByTimeRangeQuery({
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
    if (!woodArrivalData?.data) {
      return []
    }

    return woodArrivalData.data.map(woodArrivalDataItem => {
      const { id, date, supplier, car, amount, woodClass, woodType, woodCondition, dimension } =
        woodArrivalDataItem

      return {
        id,
        date: dayjs(date).format('DD.MM.YYYY'),
        supplier: supplier ? supplier.name : null,
        car: car ? car : null,
        amount,
        woodClass: woodClass.name,
        woodType: woodType.name,
        dimension: getDimensionString(dimension),
        volume: Number((dimension.volume * amount).toFixed(2)),
        woodCondition: woodCondition.name,
      }
    })
  }, [woodArrivalData])

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
              columns={WOOD_ARRIVAL_TIME_RANGE_TABLE_COLUMNS}
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
                  excelFileName: 'поступления-доска',
                },
              }}
              loading={isLoadingWoodArrivalData}
            />
          </DataGridContainer>
        )}
      />
      <TableTotalInfo
        totalVolume={woodArrivalData?.totalVolume}
        totalAmount={woodArrivalData?.totalAmount}
      />
    </Box>
  )
}
