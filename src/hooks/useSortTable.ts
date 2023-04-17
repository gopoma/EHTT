import { useEffect, useState } from 'react'
import { type Item } from '../interfaces'

interface HookParameters {
  items: Item[]
}

// eslint-disable-next-line
export const useSortTable = ({ items }: HookParameters) => {
  const [$items, $setItems] = useState<Item[]>(items)

  const [sortingCriterias, setSortingCriterias] = useState<Record<keyof Item, boolean> | null>(null)
  const [currentSortingCriteria, setCurrentSortingCriteria] = useState<{ value: keyof Item } | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    const [firstItem] = items

    const firstResultKeys = Object.keys(firstItem)
    const initialSortingCriterias = firstResultKeys.reduce((prev, current) => ({
      ...prev,
      [current]: true
    }), {})

    setSortingCriterias(initialSortingCriterias)
  }, [])

  const onSortingCriteriaElementClick = (key: keyof Item) => () => {
    setSortingCriterias((prevSortingCriterias) => ({
      ...prevSortingCriterias,
      [key]: !(sortingCriterias![key])
    }))

    setCurrentSortingCriteria({ value: key })
  }

  useEffect(() => {
    if (currentSortingCriteria === null) return

    const key = currentSortingCriteria.value
    const currentSortingCriteriaValue = sortingCriterias![key]

    const tmp = $items.map(($item) => structuredClone($item))
    tmp.sort((a: Item, b: Item) => {
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
          const DEFAULT_VALUE = -1

          return DEFAULT_VALUE
        }
      }
    })

    $setItems(tmp)
  }, [currentSortingCriteria])

  return {
    $items,
    sortingCriterias,
    onSortingCriteriaElementClick
  }
}
