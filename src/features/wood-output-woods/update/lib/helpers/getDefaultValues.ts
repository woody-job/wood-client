import { WorkshopOutTableRow } from '@/widgets/workshopOutputWoods/types'

export const getDefaultValues = (workshopOut: WorkshopOutTableRow) => {
  return {
    dimensionId: workshopOut.dimensionId,
    woodClassId: workshopOut.woodClassId,
    woodTypeId: workshopOut.woodTypeId,
    amount: workshopOut.amount,
  }
}
