import { BeamSize } from '@/entities/beam-in/model'

import { WorkshopBeamInTableRow } from '../../types/types'

const getWorkshopDefaultBeamInRows = ({
  beamSizes,
  minDiameter,
  maxDiameter,
}: {
  beamSizes: BeamSize[]
  minDiameter: number
  maxDiameter: number
}): WorkshopBeamInTableRow[] => {
  const beamSizesByDiameterSpan = beamSizes.filter(beamSize => {
    return beamSize.diameter >= minDiameter && beamSize.diameter <= maxDiameter
  })

  return beamSizesByDiameterSpan.map(beamSize => {
    return {
      id: beamSize.id, // TODO Возможно здесь нужен uuid
      diameter: beamSize.diameter,
      volume: beamSize.volume,
      beamSizeId: beamSize.id,
      beamInId: undefined,
      amount: undefined,
      isEmptyDefault: true,
      woodNaming: undefined,
    }
  })
}

export const getWorkshopBeamInDefaults = (beamSizes: BeamSize[], workshopId: string) => {
  switch (workshopId) {
    case '1':
      // Диаметры от 17 до 36 включительно
      return getWorkshopDefaultBeamInRows({ beamSizes, minDiameter: 17, maxDiameter: 36 })
    case '2':
      return []
    case '3':
      // Диаметры от 16 до 24 включительно
      return getWorkshopDefaultBeamInRows({ beamSizes, minDiameter: 16, maxDiameter: 24 })
    default:
      return []
  }
}
