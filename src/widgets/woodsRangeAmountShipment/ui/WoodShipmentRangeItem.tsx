import { FC } from 'react'

// import { useFetchWoodShipmentByRangeQuery } from '@/entities/wood-shipment'

export interface WoodShipmentRangeItemProps {
  woodConditionName: string
  startDate: string
  endDate: string
  woodConditionId: number
}

export const WoodShipmentRangeItem: FC = () =>
  // {
  // export const WoodShipmentRangeItem: FC<WoodShipmentRangeItemProps> = ({
  // woodConditionName,
  // woodConditionId,
  // endDate,
  // startDate,
  // }
  {
    // const { data: woodShipment, isLoading: isLoadingWoodShipment } = useFetchWoodShipmentByRangeQuery(
    //   startDate && endDate
    //     ? {
    //         woodConditionId,
    //         endDate,
    //         startDate,
    //       }
    //     : skipToken
    // )

    // return (
    //   <Grid container flexDirection='column' alignItems='center'>
    //     <Typography variant='h6'>{woodConditionName}</Typography>

    //     {isLoadingWoodShipment && (
    //       <Grid item lg={6} xl={6}>
    //         <Skeleton variant='circular' width='500px' height='500px' />
    //       </Grid>
    //     )}
    //     {woodShipment && (
    //       <WoodAmountSunburst data={woodShipment.sunburstData} total={woodShipment.totalVolume} />
    //     )}
    //   </Grid>
    // )

    return <h1>hello</h1>
  }
