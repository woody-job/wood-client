import { SxProps, Theme } from '@mui/material'

export const dataGridStyles: SxProps<Theme> = {
  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
    padding: '8px',
    border: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  "& .MuiDataGrid-columnHeaders [role='row']": {
    backgroundColor: theme =>
      theme.palette.mode === 'light' ? theme.background.main : theme.white[100],
    borderTopLeftRadius: '18px',
    borderTopRightRadius: '18px',
  },
  '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 500,
    fontSize: '14px',
    color: theme => theme.black[40],
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-columnHeaders': {},
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '&.MuiDataGrid-root': {
    border: 'none',
    '--unstable_DataGrid-radius': 0,
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'center',
  },

  "& [data-field='actions']": {
    position: 'absolute',
    right: 0,
  },
}
