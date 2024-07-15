import { BEAM_DELIVERY_METHOD } from '@/entities/beam-arrival'

export const getDeliveryMethodText = (deliveryMethod: BEAM_DELIVERY_METHOD) => {
  if (deliveryMethod === BEAM_DELIVERY_METHOD.OWNER_TRANSPORT) {
    return 'Самовывоз'
  }

  if (deliveryMethod === BEAM_DELIVERY_METHOD.SUPPLIER_TRANSPORT) {
    return 'Транспорт поставщика'
  }

  return ''
}
