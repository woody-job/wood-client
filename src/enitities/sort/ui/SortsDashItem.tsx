import { DashItem } from '@/shared/ui'
import { Typography } from '@mui/material'
import { FC, useMemo } from 'react'

export interface DryerDashItemProps {
  name: string
  sorts: {
    title: string
    value: number
  }[]
}

export const SortsDashItem: FC<DryerDashItemProps> = ({ sorts, name }) => {
  const sum = useMemo(() => sorts.reduce((a, b) => a + b.value, 0), [sorts])

  return (
    <DashItem
      display='flex'
      justifyContent='center'
      alignItems='start'
      flexDirection='column'
      width='300px'
    >
      <Typography fontWeight='bold' variant='subtitle1'>
        {name}
      </Typography>
      {sorts.map(sort => (
        <Typography key={sort.title}>
          {sort.title}: {sort.value} м3
        </Typography>
      ))}

      <Typography sx={{ mt: 2 }}>
        <strong>Итого: </strong>
        {sum} м3
      </Typography>
    </DashItem>
  )
}
