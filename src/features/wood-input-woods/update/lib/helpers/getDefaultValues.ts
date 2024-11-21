import { WorkshopBeamInTableRow } from '@/widgets/workshopInputWoods/types/types'

export const getDefaultValues = (beamIn: WorkshopBeamInTableRow) => {
  return {
    beamSizeId: beamIn.beamSizeId,
    amount: beamIn.amount,
  }
}
