import { WorkshopBeamInTableRow } from '@/widgets/workshopInputWoods/types/types'

export const getDefaultValues = (beamIn: WorkshopBeamInTableRow) => {
  return {
    diameter: beamIn.diameter,
    amount: beamIn.amount,
  }
}
