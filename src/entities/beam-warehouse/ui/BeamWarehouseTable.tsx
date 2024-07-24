import { FC, useMemo } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'

import { BEAM_WAREHOUSE_TABLE_COLUMNS } from '../constants'
import { BeamWarehouseOutput } from '../model'

export interface BeamWarehouseTableProps {
  onFullscreen?: () => void
  fullscreen?: boolean
  beamWarehouseData?: BeamWarehouseOutput[]
  isLoadingBeamWarehouseTableData?: boolean
}

export const BeamWarehouseTable: FC<BeamWarehouseTableProps> = ({
  beamWarehouseData,
  isLoadingBeamWarehouseTableData,
  onFullscreen,
  fullscreen,
}) => {
  const rows = useMemo(() => {
    if (!beamWarehouseData) {
      return []
    }

    return beamWarehouseData.map(beamWarehouseRecordData => {
      return {
        id: beamWarehouseRecordData.id,
        woodNaming: beamWarehouseRecordData.woodNaming.name,
        volume: beamWarehouseRecordData.volume
          ? Number(Number(beamWarehouseRecordData.volume)?.toFixed(4))
          : null,
      }
    })
  }, [beamWarehouseData])

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
        columns={BEAM_WAREHOUSE_TABLE_COLUMNS}
        rows={rows}
        disableRowSelectionOnClick
        disableMultipleRowSelection
        localeText={dataGridLocaleText}
        sx={{ ...dataGridStyles, width: '100%' }}
        hideFooter
        // @eslint-ignore
        // @ts-expect-error 'error occured'
        slots={{ panel: CustomGridPanel, toolbar: CustomToolbar }}
        slotProps={{
          toolbar: { excelFileName: `склад-сырье` },
        }}
        loading={isLoadingBeamWarehouseTableData}
      />
    </DataGridContainer>
  )
}
