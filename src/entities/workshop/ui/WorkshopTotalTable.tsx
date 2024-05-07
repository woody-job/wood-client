import { DataGrid } from '@mui/x-data-grid'

import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export const WorkshopTotalTable = () => {
  const data = [
    {
      id: 1,
      date: '4/1/2024',
      section: 'Елки 4',
      wood: '200/47/6',
      sort1: '33.34',
      sort2: '3.11',
      inputVolume: '36.44',
      outputPercentage: '68.08',
      outputPercentage2: '53.53%',
      revenue: '613403',
      rawMaterial: '395123',
      processing: '109231',
      summary: '109231',
      summaryCube: '3041',
    },
    {
      id: 2,
      date: '4/8/2024',
      section: 'Берёзы 3',
      wood: '250/50/7',
      sort1: '40.21',
      sort2: '4.12',
      inputVolume: '45.67',
      outputPercentage: '72.15',
      outputPercentage2: '58.29%',
      revenue: '642901',
      rawMaterial: '412345',
      processing: '121456',
      summary: '121456',
      summaryCube: '3210',
    },
    {
      id: 3,
      date: '4/15/2024',
      section: 'Дуб 2',
      wood: '300/60/8',
      sort1: '47.89',
      sort2: '5.13',
      inputVolume: '55.90',
      outputPercentage: '75.23',
      outputPercentage2: '61.42%',
      revenue: '672398',
      rawMaterial: '429876',
      processing: '133789',
      summary: '133789',
      summaryCube: '3412',
    },
    {
      id: 4,
      date: '4/22/2024',
      section: 'Берёзы 2',
      wood: '350/70/9',
      sort1: '55.56',
      sort2: '6.15',
      inputVolume: '66.13',
      outputPercentage: '78.29',
      outputPercentage2: '64.85%',
      revenue: '701596',
      rawMaterial: '457789',
      processing: '146321',
      summary: '146321',
      summaryCube: '3611',
    },
    {
      id: 5,
      date: '4/29/2024',
      section: 'Елки 3',
      wood: '400/80/10',
      sort1: '63.23',
      sort2: '7.17',
      inputVolume: '76.36',
      outputPercentage: '80.45',
      outputPercentage2: '66.38%',
      revenue: '730893',
      rawMaterial: '485901',
      processing: '159234',
      summary: '159234',
      summaryCube: '3812',
    },
  ]

  const columns = [
    { headerName: 'Дата', field: 'date' },
    { headerName: 'Сечение', field: 'section' },
    { headerName: 'Лес', field: 'wood' },
    { headerName: 'Сорт 1', field: 'sort1' },
    { headerName: 'Сорт 2', field: 'sort2' },
    { headerName: 'Вход, м3', field: 'inputVolume' },
    { headerName: 'Выход, %', field: 'outputPercentage' },
    { headerName: 'Выход 2 сорт', field: 'outputPercentage2' },
    { headerName: 'Выручка', field: 'revenue' },
    { headerName: 'Сырье', field: 'rawMaterial' },
    { headerName: 'Распиловка', field: 'processing' },
    { headerName: 'Итог', field: 'summary' },
    { headerName: 'Итог на куб', field: 'summaryCube' },
  ]

  return (
    <DataGridContainer>
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        disableMultipleRowSelection
        localeText={dataGridLocaleText}
        sx={dataGridStyles}
        hideFooter
        slots={{ panel: CustomGridPanel }}
      />
    </DataGridContainer>
  )
}
