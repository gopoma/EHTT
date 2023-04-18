import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Person } from '../../interfaces'

interface FavoritesState {
  favorites: Person[]
}

const DEFAULT_STATE: FavoritesState = {
  favorites: []
}

const initialState: FavoritesState = (() => {
  const favorites = localStorage.getItem('favorites')

  return (favorites !== null)
    ? { favorites: JSON.parse(favorites) }
    : DEFAULT_STATE
})()

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    onAddFavorite: (state, { payload }: PayloadAction<Person>) => {
      state.favorites.push(payload)
    },
    onDeleteFavorite: (state, { payload }: PayloadAction<Person>) => {
      state.favorites = state.favorites.filter((favorite) => favorite.id !== payload.id)
    }
  }
})

export default favoritesSlice.reducer

export const { onAddFavorite, onDeleteFavorite } = favoritesSlice.actions
