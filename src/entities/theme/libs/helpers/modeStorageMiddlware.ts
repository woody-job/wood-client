import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

import { RootState } from '@/app/store'
import { storageKeys } from '@/shared/constants'

import { setMode, switchMode } from '../../model'

export const modeStorageMiddlware = createListenerMiddleware()

modeStorageMiddlware.startListening({
  matcher: isAnyOf(switchMode, setMode),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState
    console.log(state)
    localStorage.setItem(storageKeys.mode, state.theme.mode)
  },
})
