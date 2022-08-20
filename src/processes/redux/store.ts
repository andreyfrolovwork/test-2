import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice, { IAuth } from '@/processes/redux/authSlice'

export interface IRoot {
  auth: IAuth
}

const rootReducers = combineReducers({
  auth: authSlice,
})

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof rootReducers>
export type AppDispatch = typeof store.dispatch

export default store
