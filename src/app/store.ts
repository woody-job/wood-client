import { modeStorageMiddlware } from '@/entities/theme/libs/helpers'
import { themeSlice } from '@/entities/theme/model/slices'
import { baseApi } from '@/shared/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [themeSlice.reducerPath]: themeSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware, modeStorageMiddlware.middleware),
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
