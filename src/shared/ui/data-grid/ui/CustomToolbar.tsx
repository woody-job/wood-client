import { Box, Grid, MenuItem } from '@mui/material'
import {
  gridFilteredSortedRowIdsSelector,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarQuickFilter,
  useGridApiContext,
} from '@mui/x-data-grid'
import { GridApiCommunity, gridVisibleColumnFieldsSelector } from '@mui/x-data-grid/internals'

import * as XLSX from 'xlsx'

const getExcelData = (apiRef: React.MutableRefObject<GridApiCommunity>) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef)
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef)

  // Format the data. Here we only keep the value
  return filteredSortedRowIds.map(id => {
    const row = {}

    visibleColumnsField.forEach(field => {
      // @eslint-ignore
      // @ts-expect-error 'error occured'
      row[field] = apiRef.current.getCellParams(id, field).value
    })

    return row
  })
}

const handleExport = (apiRef: React.MutableRefObject<GridApiCommunity>) => {
  const data = getExcelData(apiRef)

  const columns = apiRef.current.getAllColumns()

  const fields = columns.map(c => c.field)
  const rows = data.map(row => {
    const mRow = {}

    for (const key of fields) {
      // @eslint-ignore
      // @ts-expect-error 'error occured'
      mRow[key] = row[key]
    }

    return mRow
  })

  const columnNames = columns.map(c => c.headerName)
  const worksheet = XLSX.utils.json_to_sheet(rows)

  XLSX.utils.sheet_add_aoa(worksheet, [[...columnNames]], {
    origin: 'A1',
  })

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  XLSX.writeFile(workbook, document.title + '.xlsx', { compression: true })
}

export const ExportMenuItem = () => {
  const apiRef = useGridApiContext()

  return (
    <MenuItem
      sx={{ py: '0px !important', px: 1, height: 40 }}
      onClick={() => {
        handleExport(apiRef)
        apiRef.current.hideColumnMenu?.()
      }}
    >
      Выгрузить в Excel
    </MenuItem>
  )
}

export const ExportButton = () => {
  return (
    <GridToolbarExportContainer>
      <ExportMenuItem />
    </GridToolbarExportContainer>
  )
}

export type CustomToolbarProps = { withExcelExport?: boolean }

export const CustomToolbar = ({ withExcelExport = true }: CustomToolbarProps) => {
  return (
    <GridToolbarContainer>
      <Grid container justifyContent='flex-end'>
        <Box mr={3}>
          <GridToolbarQuickFilter />
        </Box>
        {withExcelExport && (
          <Box mr={3}>
            <ExportButton />
          </Box>
        )}
      </Grid>
    </GridToolbarContainer>
  )
}
