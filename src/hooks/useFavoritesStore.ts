import { useEffect } from 'react'
import type { Person } from '../interfaces'
import { onAddFavorite, onDeleteFavorite } from '../store'
import { useAppDispatch, useAppSelector } from './useStore'

// eslint-disable-next-line
export const useFavoritesStore = () => {
  const dispatch = useAppDispatch()
  const { favorites } = useAppSelector((state) => state.favorites)

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const startTogglingFavorite = (person: Person): void => {
    if (favorites.some((favorite) => favorite.id === person.id)) {
      dispatch(onDeleteFavorite(person))
    } else {
      dispatch(onAddFavorite(person))
    }
  }

  return {
    favorites,

    startTogglingFavorite
  }
}
