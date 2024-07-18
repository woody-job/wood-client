import { useEffect } from 'react'

import { EVENT_NAME } from '@/shared/constants'
import { EventListener } from '@/shared/types'

import { subscribe, unsubscribe } from '../../helpers'

export const useSubscribeEvent = (eventName: EVENT_NAME, listener: EventListener) => {
  useEffect(() => {
    subscribe(eventName, listener)
    return () => {
      unsubscribe(eventName, listener)
    }
  }, [])
}
