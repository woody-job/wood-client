import { Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export const WorkshopTrashStatsSunburst = () => {
  const data = {
    name: 'Дата',
    children: [
      {
        name: 'Мусор',
        value: 10,
      },
      {
        name: 'Выход',
        children: [
          {
            name: '1 сорт',
            value: 3.108,
          },
          {
            name: '2 сорт',
            value: 3.108,
          },
        ],
      },
    ],
  }

  return (
    <CustomSunburst
      data={data}
      id='name'
      value='value'
      valueFormat={value => `${value} м3`}
      arcLabel={({ path, value, percentage }) =>
        path[1] === 'Выход' ? `${value} м3` : `${path[0]}: ${percentage.toFixed(2)}%`
      }
      containerProps={{
        width: 600,
        height: 600,
        ml: 'auto',
      }}
    >
      <Typography variant='h6'>Всего м3</Typography>
      <Typography variant='h6'>36.4436%</Typography>
    </CustomSunburst>
  )
}
