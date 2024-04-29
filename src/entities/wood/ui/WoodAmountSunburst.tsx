import { CustomSunburst } from '@/shared/ui'
import { Typography } from '@mui/material'

export const WoodAmountSunburst = () => {
  const data = {
    name: 'root',
    children: [
      {
        name: '1 сорт',
        children: [
          {
            name: '10x10',
            amount: 10,
          },
          {
            name: '15x15',
            amount: 15,
          },
          {
            name: '20x20',
            amount: 20,
          },
        ],
      },
      {
        name: '2 сорт',
        children: [
          {
            name: '10x10',
            amount: 10,
          },
          {
            name: '15x15',
            amount: 15,
          },
          {
            name: '20x20',
            amount: 20,
          },
        ],
      },
      {
        name: 'Береза',
        children: [
          {
            name: '10x10',
            amount: 10,
          },
          {
            name: '15x15',
            amount: 15,
          },
          {
            name: '20x20',
            amount: 20,
          },
        ],
      },
    ],
  }

  return (
    <CustomSunburst data={data} id='name' value='amount'>
      <Typography variant='h6' textAlign='center'>
        Всего м3:
      </Typography>
      <Typography variant='h6' textAlign='center'>
        123
      </Typography>
    </CustomSunburst>
  )
}
