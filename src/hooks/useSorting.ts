import { useEffect, useState } from 'react'

// eslint-disable-next-line
export const useSorting = <T extends Record<string, any>>(items: T[] = []) => {
  const [sortedItems, setSortedItems] = useState<T[]>(items)

  type SortingCriterias = Record<keyof T, boolean>
  interface CurrentSortingCriteria { value: keyof T }

  const [sortingCriterias, setSortingCriterias] = useState<SortingCriterias>({} as any)
  const [currentSortingCriteria, setCurrentSortingCriteria] = useState<CurrentSortingCriteria>({} as any)

  useEffect(() => { setSortedItems(items) }, [items])

  const onSortingCriteriaElementClick = (key: keyof T) => () => {
    setSortingCriterias((prevSortingCriterias) => ({
      ...prevSortingCriterias,
      [key]: !(sortingCriterias[key])
    }) as any)

    setCurrentSortingCriteria({ value: key })
  }

  useEffect(() => {
    if (currentSortingCriteria === null) return

    const key: keyof T = currentSortingCriteria.value
    const currentSortingCriteriaValue: boolean = sortingCriterias[key]

    const newSortedItems = sortedItems.map((sortedItem) => structuredClone(sortedItem))
    newSortedItems.sort((a: T, b: T) => {
      switch (typeof a[key]) {
        case 'number': {
          // true                    - false
          // Ascendente [1, 2, 3, 4] - Descendente [4, 3, 2, 1]
          const firstComparator = a[key] as number
          const secondComparator = b[key] as number

          return currentSortingCriteriaValue ? firstComparator - secondComparator : secondComparator - firstComparator
        }
        case 'string': {
          const firstComparator = b[key] as string
          const secondComparator = a[key] as string

          return currentSortingCriteriaValue ? firstComparator.localeCompare(secondComparator) : secondComparator.localeCompare(firstComparator)
        }
        default: {
          const DEFAULT_VALUE = 0

          return DEFAULT_VALUE
        }
      }
    })

    setSortedItems(newSortedItems)
  }, [sortingCriterias, currentSortingCriteria])

  return {
    sortedItems,
    sortingCriterias,
    onSortingCriteriaElementClick
  }
}
