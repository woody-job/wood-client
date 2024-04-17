import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {baseApi} from "@/shared/api";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()