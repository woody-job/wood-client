import { GridLocaleText } from '@mui/x-data-grid'
import { ruRU } from '@mui/x-data-grid/locales'

export const dataGridLocaleText: Partial<GridLocaleText> = {
  ...ruRU.components.MuiDataGrid.defaultProps.localeText,
  columnsManagementSearchTitle: 'Найти',
  columnMenuManageColumns: 'Изменить',
  columnsManagementShowHideAllText: 'Показать все',
  actionsCellMore: 'Другие',
  pinToRight: 'Пинать вправо',
}
