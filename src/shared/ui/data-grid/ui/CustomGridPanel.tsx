import { useEffect } from 'react'

import { Box } from '@mui/material'
import { GridPanel, GridPanelProps } from '@mui/x-data-grid'

export const CustomGridPanel = (props: GridPanelProps) => {
  useEffect(() => {
    requestAnimationFrame(() => {
      const element = document?.querySelector('.MuiDataGrid-columnsManagementFooter')
      const button = element?.children[1]
      if (!button) return

      button.innerHTML = 'Сбросить'
    })
  }, [props.open])
  return (
    <Box>
      <GridPanel {...props} />
    </Box>
  )
}
