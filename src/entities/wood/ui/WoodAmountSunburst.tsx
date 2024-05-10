import { Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export const WoodAmountSunburst = () => {
  const data = {
    name: 'root',
    children: [
      {
        name: '1 сорт',
        children: [
          {
            name: '100x100x10',
            amount: 10,
          },
          {
            name: '100x100x10',
            amount: 15,
          },
          {
            name: '100x100x10',
            amount: 20,
          },
        ],
      },
      {
        name: '2 сорт',
        children: [
          {
            name: '100x100x10',
            amount: 10,
          },
          {
            name: '100x100x10',
            amount: 15,
          },
          {
            name: '100x100x10',
            amount: 20,
          },
        ],
      },
      {
        name: 'Береза',
        children: [
          {
            name: '100x100x10',
            amount: 10,
          },
          {
            name: '100x100x10',
            amount: 15,
          },
          {
            name: '100x100x10',
            amount: 20,
          },
        ],
      },
    ],
  }

  return (
    <CustomSunburst
      data={data}
      id='name'
      value='amount'
      arcLabel={({ id }) => `${id}`}
      containerProps={{
        width: '600px',
        height: '600px',
      }}
    >
      <Typography variant='h6' textAlign='center'>
        Всего м3:
      </Typography>
      <Typography variant='h6' textAlign='center'>
        123
      </Typography>
    </CustomSunburst>
  )
}
