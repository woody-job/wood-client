import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { themeSlice } from '@/enitities/theme/model/slices'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [themeSlice.reducerPath]: themeSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
