import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favorites/favoritesSlice'
import modalReducer from './modal/modalSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    modal: modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
