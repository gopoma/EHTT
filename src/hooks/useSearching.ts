import { type ChangeEvent, useState, useEffect } from 'react'

interface SearchFilterCriteria {
  field: string
  value: string
}

const initialSearchFilterCriteria: SearchFilterCriteria = {
  field: '',
  value: ''
}

// eslint-disable-next-line
export const useSearching = <T extends Record<string, any>>({ items = [] }: { items: T[] }) => {
  const [searchFilterCriteria, setSearchFilterCriteria] = useState<SearchFilterCriteria>(initialSearchFilterCriteria)
  const [searchResults, setSearchResults] = useState<T[]>(items)

  useEffect(() => { setSearchResults(items) }, [items])

  const onSearchFilterFieldChange = ({ target: { value: searchFilterField } }: ChangeEvent<HTMLSelectElement>): void => {
    setSearchFilterCriteria((prevSearchFilterCriteria) => ({
      ...prevSearchFilterCriteria,
      field: searchFilterField
    }))
  }

  const onSearchFilterValueChange = ({ target: { value: searchFilterValue } }: ChangeEvent<HTMLInputElement>): void => {
    setSearchFilterCriteria((prevSearchFilterCriteria) => ({
      ...prevSearchFilterCriteria,
      value: searchFilterValue
    }))
  }

  useEffect(() => {
    const { field, value } = searchFilterCriteria

    if (field === '' || value === '') {
      setSearchResults(items)
      return
    }

    const newSearchResults = items.filter((item) => item[field as keyof T].toString().toLowerCase().includes(value.toLowerCase()))
    setSearchResults(newSearchResults)
  }, [searchFilterCriteria])

  return {
    searchFilterCriteria,
    searchResults,

    onSearchFilterFieldChange,
    onSearchFilterValueChange
  }
}
