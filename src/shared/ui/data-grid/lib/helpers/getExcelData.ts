import { gridFilteredSortedRowIdsSelector, gridVisibleColumnFieldsSelector } from '@mui/x-data-grid'
import { GridApiCommunity } from '@mui/x-data-grid/internals'

import dayjs from 'dayjs'
import * as XLSX from 'xlsx'

export const generateFileTimestamp = () => {
  const now = dayjs()

  const dateTime = now.format('DD.MM.YYYY-HH:mm:ss')

  return dateTime
}

export const getExcelData = (apiRef: React.MutableRefObject<GridApiCommunity>) => {
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

export const handleExport = (
  apiRef: React.MutableRefObject<GridApiCommunity>,
  excelFileName: string | undefined
) => {
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

  const timestamp = generateFileTimestamp()
  const fileName = excelFileName
    ? `${excelFileName}.${timestamp}`
    : `${document.title}.${timestamp}`

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  XLSX.writeFile(workbook, fileName + '.xlsx', { compression: true })
}
