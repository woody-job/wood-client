import { FC, useMemo } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import { getDimensionString } from '@/entities/dimension'
import {
  CustomGridPanel,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { DataGridContainer } from '@/shared/ui/data-grid'

import { DRYER_CONDITION_TABLE_COLUMNS } from '../constants'
import { DryerDataResponse } from '../model'

type DryerConditionTableProps = {
  onFullscreen?: () => void
  fullscreen?: boolean
  dryerData: DryerDataResponse | undefined
  isLoadingDryerData: boolean
}

export const DryerConditionTable: FC<DryerConditionTableProps> = ({
  fullscreen,
  onFullscreen,
  dryerData,
  isLoadingDryerData,
}) => {
  const rows = useMemo(() => {
    if (!dryerData?.data) {
      return []
    }

    return dryerData?.data.map(dryerChamberData => {
      return {
        id: dryerChamberData.id,
        chamberIterationCountWhenBringingIn: dryerChamberData.chamberIterationCountWhenBringingIn,
        dimension: getDimensionString(dryerChamberData.dimension),
        woodClass: dryerChamberData.woodClass.name,
        woodType: dryerChamberData.woodType.name,
        amount: dryerChamberData.amount,
        volume: Number((dryerChamberData.dimension.volume * dryerChamberData.amount).toFixed(2)),
      }
    })
  }, [dryerData])

  return (
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
        columns={DRYER_CONDITION_TABLE_COLUMNS}
        rows={rows}
        disableRowSelectionOnClick
        disableMultipleRowSelection
        localeText={dataGridLocaleText}
        sx={{ ...dataGridStyles, width: 400 }}
        hideFooter
        slots={{ panel: CustomGridPanel }}
        loading={isLoadingDryerData}
      />
    </DataGridContainer>
  )
}
