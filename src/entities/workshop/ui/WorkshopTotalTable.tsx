import { FC, useEffect, useMemo } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Box, CircularProgress, Divider, Grid, Typography } from '@mui/material'
import {
  DataGrid,
  GridCellParams,
  GridEventListener,
  GridRowClassNameParams,
  GridTreeNode,
} from '@mui/x-data-grid'

import { useFetchWorkshopReportQuery } from '@/entities/workshop-out'
import {
  NEGATIVE_WAREHOUSE_VALUE_CLASSNAME,
  NEGATIVE_WAREHOUSE_VALUE_STYLE,
  NEGATIVE_WAREHOUSE_VALUE_TEXT_CLASSNAME,
  urls,
} from '@/shared/constants'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType, TimeRange } from '@/shared/types'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'

import { WORKSHOP_TOTAL_TABLE_COLUMNS } from '../constants'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'

type WorkshopTotalTableProps = {
  timeRange: TimeRange
  onFullscreen?: () => void
  fullscreen?: boolean
  workshopId?: number
  initialHeight?: number | string
  displayToolbar?: boolean
}

export const WorkshopTotalTable: FC<WorkshopTotalTableProps> = ({
  timeRange,
  onFullscreen,
  fullscreen,
  workshopId: workshopIdFromProps,
  initialHeight = 600,
  displayToolbar = true,
}) => {
  const { workshopId } = useParams()
  const navigate = useNavigate()

  const actualWorkshopId = workshopId ?? workshopIdFromProps

  const {
    data: workshopOutReportData,
    isLoading: isLoadingWorkshopOutReport,
    isError,
    error,
  } = useFetchWorkshopReportQuery({
    workshopId: actualWorkshopId ? Number(actualWorkshopId) : -1,
    startDate: timeRange.startDate.toISOString(),
    endDate: timeRange.endDate.toISOString(),
  })

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!isError) {
      return
    }

    defaultErrorHandler(error as CommonErrorType, message =>
      enqueueSnackbar(message, { variant: 'error' })
    )
  }, [isError])

  const rows = useMemo(() => {
    if (!workshopOutReportData) {
      return []
    }

    return workshopOutReportData.data.map(reportItem => {
      return { ...reportItem, date: dayjs(reportItem.date).format('DD.MM.YYYY') }
    })
  }, [workshopOutReportData])

  const handleRowDoubleClick: GridEventListener<'rowDoubleClick'> = event => {
    navigate(`/${urls.workshop}/${actualWorkshopId}/${urls.day}?date=${event.row.date}`)
  }

  const handleGetCellClassname = (params: GridCellParams<any, any, any, GridTreeNode>) => {
    const { profit } = params.row

    if (profit < 0 && (params.field === 'profit' || params.field === 'profitPerUnit')) {
      return NEGATIVE_WAREHOUSE_VALUE_TEXT_CLASSNAME
    }

    return ''
  }

  const handleGetRowClassName = (params: GridRowClassNameParams<any>) => {
    const { profit } = params.row

    if (profit < 0) {
      return NEGATIVE_WAREHOUSE_VALUE_CLASSNAME
    }

    return ''
  }

  const totalInfo = (
    <Grid container justifyContent='flex-end'>
      <Box>
        <Grid container justifyContent={'flex-end'} sx={{ mt: 0.5 }}>
          <Box>
            <Grid container>
              <Typography>
                Итого м3 (доска):{' '}
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  {workshopOutReportData?.totalWoodsVolume ?? 0}
                </Typography>
              </Typography>
              <Typography sx={{ ml: 3 }}>
                Итого шт (доска):{' '}
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  {workshopOutReportData?.totalWoodsAmount ?? 0}
                </Typography>
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Divider />
        <Grid container justifyContent={'flex-end'} sx={{ mt: 0.5, mb: 2 }}>
          <Box>
            <Grid container>
              <Typography>
                Итого м3 (лес):{' '}
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  {workshopOutReportData?.totalBeamInVolume ?? 0}
                </Typography>
              </Typography>
              <Typography sx={{ ml: 3 }}>
                Итого шт (лес):{' '}
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  {workshopOutReportData?.totalBeamInAmount ?? 0}
                </Typography>
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Grid>
  )

  return (
    <>
      <DataGridContainer
        sx={{
          display: 'flex',
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.background.main : theme.white[100],
          ...NEGATIVE_WAREHOUSE_VALUE_STYLE,
        }}
        height={fullscreen ? '100%' : initialHeight}
      >
        {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}
        {isLoadingWorkshopOutReport && (
          <Box sx={{ width: '100%', height: '100%', display: 'grid', placeContent: 'center' }}>
            <CircularProgress size={100} />
          </Box>
        )}
        {workshopOutReportData && (
          <DataGrid
            rows={rows}
            columns={WORKSHOP_TOTAL_TABLE_COLUMNS}
            disableRowSelectionOnClick
            disableMultipleRowSelection
            localeText={dataGridLocaleText}
            sx={{ ...dataGridStyles, width: 400 }}
            hideFooter
            // @eslint-ignore
            // @ts-expect-error 'error occured'
            slots={{ panel: CustomGridPanel, toolbar: displayToolbar && CustomToolbar }}
            onRowDoubleClick={handleRowDoubleClick}
            getCellClassName={handleGetCellClassname}
            getRowClassName={handleGetRowClassName}
          />
        )}
      </DataGridContainer>
      {displayToolbar && totalInfo}
    </>
  )
}
