import { DashItem } from '@/shared/ui'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'

export const WorkshopDashItem = () => {
  const theme = useTheme()
  const data = [
    {
      day: '1 апр',
      'Крутая древесина': 10,
      'Хз древесина': 20,
    },
    {
      day: '2 апр',
      'Крутая древесина': 5,
      'Хз древесина': 1,
    },
    {
      day: '3 апр',
      'Крутая древесина': 20,
      'Хз древесина': 60,
    },
  ]

  return (
    <DashItem
      display='flex'
      justifyContent='center'
      alignItems='start'
      flexDirection='column'
      minWidth='570px'
      width='570px'
      gap={3}
    >
      <Typography>Цех 1</Typography>

      <Box height='350px' width='100%' borderRadius={4}>
        <ResponsiveBar
          data={data}
          keys={['Крутая древесина', 'Хз древесина']}
          indexBy='day'
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'paired' }}
          axisTop={null}
          axisRight={null}
          theme={{
            tooltip: {
              container: {
                background: theme.white['100'],
              },
            },
            axis: {
              ticks: {
                line: {
                  stroke: theme.palette.text.primary,
                  strokeWidth: 2,
                  strokeLinecap: 'square',
                },
                text: {
                  fill: theme.black['100'],
                },
              },
              legend: {
                text: {
                  fill: theme.black['100'],
                },
              },
              domain: {
                line: {
                  stroke: theme.palette.text.primary,
                  strokeWidth: 2,
                  strokeLinecap: 'square',
                },
              },
            },
          }}
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
