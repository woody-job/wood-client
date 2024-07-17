import { EVENT_NAME } from '@/shared/constants'
import { EventData } from '@/shared/types'

export const subscribe = (eventName: EVENT_NAME, listener: EventListener) => {
  document.addEventListener(eventName, listener)
}

export const unsubscribe = (eventName: EVENT_NAME, listener: EventListener) => {
  document.removeEventListener(eventName, listener)
}

export const publish = (eventName: EVENT_NAME, data?: EventData) => {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}
