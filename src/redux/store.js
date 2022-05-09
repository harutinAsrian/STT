import { configureStore, combineReducers } from '@reduxjs/toolkit'
import dataReducer from './slices/dataSlice'

const rootReducer = combineReducers({
  dataReducer
})

export const store = configureStore({
  reducer: rootReducer
})
