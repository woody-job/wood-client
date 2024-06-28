import { FC, useMemo } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import { getDimensionString } from '@/entities/dimension'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'

import { WAREHOUSE_TABLE_COLUMNS } from '../constants'
import { WarehouseOutput } from '../model'

export interface WarehouseTableProps {
  onFullscreen?: () => void
  fullscreen?: boolean
  warehouseData?: WarehouseOutput[]
  isLoadingWarehouseTableData?: boolean
  tableName: string
}

export const WarehouseTable: FC<WarehouseTableProps> = ({
  warehouseData,
  isLoadingWarehouseTableData,
  tableName,
  onFullscreen,
  fullscreen,
}) => {
  const rows = useMemo(() => {
    if (!warehouseData) {
      return []
    }

    return warehouseData.map(warehouseRecordData => {
      return {
        id: warehouseRecordData.id,
        dimension: getDimensionString(warehouseRecordData.dimension),
        woodType: warehouseRecordData.woodType.name,
        firstClassVolume: warehouseRecordData.firstClassVolume,
        secondClassVolume: warehouseRecordData.secondClassVolume,
        marketClassVolume: warehouseRecordData.marketClassVolume,
        brownClassVolume: warehouseRecordData.brownClassVolume,
        amount: warehouseRecordData.amount,
        totalVolume: warehouseRecordData.totalVolume,
      }
    })
  }, [warehouseData])

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
        columns={WAREHOUSE_TABLE_COLUMNS}
        rows={rows}
        disableRowSelectionOnClick
        disableMultipleRowSelection
        localeText={dataGridLocaleText}
        sx={{ ...dataGridStyles, width: '100%' }}
        hideFooter
        slots={{ panel: CustomGridPanel, toolbar: CustomToolbar }}
        slotProps={{
          toolbar: { excelFileName: `склад-${tableName.toLocaleLowerCase()}` },
        }}
        loading={isLoadingWarehouseTableData}
      />
    </DataGridContainer>
  )
}
