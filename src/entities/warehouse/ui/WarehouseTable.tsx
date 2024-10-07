import { FC, useMemo } from 'react'

import { DataGrid, GridCellParams, GridRowClassNameParams, GridTreeNode } from '@mui/x-data-grid'

import { getDimensionString } from '@/entities/dimension'
import {
  NEGATIVE_WAREHOUSE_VALUE_CLASSNAME,
  NEGATIVE_WAREHOUSE_VALUE_STYLE,
  NEGATIVE_WAREHOUSE_VALUE_TEXT_CLASSNAME,
} from '@/shared/constants'
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

  const handleGetCellClassname = (params: GridCellParams<any, any, any, GridTreeNode>) => {
    const { firstClassVolume, secondClassVolume, marketClassVolume, brownClassVolume } = params.row

    if (firstClassVolume < 0 && params.field === 'firstClassVolume') {
      return NEGATIVE_WAREHOUSE_VALUE_TEXT_CLASSNAME
    }

    if (secondClassVolume < 0 && params.field === 'secondClassVolume') {
      return NEGATIVE_WAREHOUSE_VALUE_TEXT_CLASSNAME
    }

    if (marketClassVolume < 0 && params.field === 'marketClassVolume') {
      return NEGATIVE_WAREHOUSE_VALUE_TEXT_CLASSNAME
    }

    if (brownClassVolume < 0 && params.field === 'brownClassVolume') {
      return NEGATIVE_WAREHOUSE_VALUE_TEXT_CLASSNAME
    }

    return ''
  }

  const handleGetRowClassName = (params: GridRowClassNameParams<any>) => {
    const { firstClassVolume, secondClassVolume, marketClassVolume, brownClassVolume } = params.row

    if (
      firstClassVolume < 0 ||
      secondClassVolume < 0 ||
      marketClassVolume < 0 ||
      brownClassVolume < 0
    ) {
      return NEGATIVE_WAREHOUSE_VALUE_CLASSNAME
    }

    return ''
  }

  return (
    <DataGridContainer
      sx={{
        display: 'flex',
        backgroundColor: theme =>
          theme.palette.mode === 'light' ? theme.background.main : theme.white[100],
        ...NEGATIVE_WAREHOUSE_VALUE_STYLE,
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
        // @eslint-ignore
        // @ts-expect-error 'error occured'
        slots={{ panel: CustomGridPanel, toolbar: CustomToolbar }}
        slotProps={{
          toolbar: { excelFileName: `склад-${tableName.toLocaleLowerCase()}` },
        }}
        rowSpacingType='margin'
        getCellClassName={handleGetCellClassname}
        getRowClassName={handleGetRowClassName}
        loading={isLoadingWarehouseTableData}
      />
    </DataGridContainer>
  )
}
