import { DashItem } from '@/shared/ui/dashboard/DashItem'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'

export const WorkshopsDashboard = () => {
  const theme = useTheme()
  const data = [
    {
      day: '1 апр',
      sort1: 10,
      sort2: 1,
    },
    {
      day: '2 апр',
      sort1: 20,
      sort2: 5,
    },
    {
      day: '3 апр',
      sort1: 5,
      sort2: 1,
    },
  ]

  return (
    <DashItem
      display='flex'
      justifyContent='center'
      alignItems='start'
      flexDirection='column'
      maxWidth='600px'
      width='100%'
      gap={3}
    >
      <Typography>Цех 1</Typography>

      <Box height='350px' width='100%' borderRadius={4}>
        <ResponsiveBar
          data={data}
          keys={['sort1', 'sort2']}
          indexBy='day'
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'День',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Количество',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              itemTextColor: theme.black['80'],
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role='application'
          ariaLabel='Nivo bar chart demo'
          barAriaLabel={e => e.id + ': ' + e.formattedValue + ' in day: ' + e.indexValue}
        />
      </Box>

      <Box display='flex' justifyContent='space-between' alignItems='end' width='100%'>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h6' color={theme => theme.black['80']}>
            Сегодня:
          </Typography>
          <Typography variant='subtitle1' color={theme => theme.black['80']}>
            <strong>Вход</strong>: 68.08 м3
          </Typography>
          <Typography variant='subtitle1' color={theme => theme.black['80']}>
            <strong>Итого на куб</strong>: 2997
          </Typography>
        </Box>

        <Button size='small'>Подробнее</Button>
      </Box>
    </DashItem>
  )
}
