import { FC } from 'react'

import { Box, Grid, MenuItem } from '@mui/material'
import {
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarQuickFilter,
  useGridApiContext,
} from '@mui/x-data-grid'

import { handleExport } from '../lib/helpers'

export type ExportMenuItemProps = {
  excelFileName?: string
}

export const ExportMenuItem: FC<ExportMenuItemProps> = ({ excelFileName }) => {
  const apiRef = useGridApiContext()

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef, excelFileName)
        apiRef.current.hideColumnMenu?.()
      }}
    >
      Выгрузить в Excel
    </MenuItem>
  )
}

export type ExportButtonProps = {
  excelFileName?: string
}

export const ExportButton: FC<ExportButtonProps> = ({ excelFileName }) => {
  return (
    <GridToolbarExportContainer>
      <ExportMenuItem excelFileName={excelFileName} />
    </GridToolbarExportContainer>
  )
}

export type CustomToolbarProps = { withExcelExport?: boolean; excelFileName?: string }

export const CustomToolbar = ({ withExcelExport = true, excelFileName }: CustomToolbarProps) => {
  return (
    <GridToolbarContainer>
      <Grid container justifyContent='flex-end'>
        <Box mr={3}>
          <GridToolbarQuickFilter />
        </Box>
        {withExcelExport && (
          <Box mr={3}>
            <ExportButton excelFileName={excelFileName} />
          </Box>
        )}
      </Grid>
    </GridToolbarContainer>
  )
}
