import React, { useState, type FC, useEffect, type ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ArrowDownIcon, ArrowUpIcon } from './icons'
import { useSorting } from '../hooks'
import { type Person } from '../interfaces'
import { getPeople } from '../services'

const selectedFields: Partial<Record<keyof Person, boolean>> = {
  category: true,
  company: true,
  happinessLevel: true,
  name: true
}

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>([])
  const {
    sortedItems,
    sortingCriterias,
    onSortingCriteriaElementClick
  } = useSorting<Person>(people)

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(console.log)
  }, [])

  interface SearchFilterCriteria {
    field: string
    value: string
  }
  const initialSearchFilterCriteria: SearchFilterCriteria = {
    field: '',
    value: ''
  }
  const [searchFilterCriteria, setSearchFilterCriteria] = useState<SearchFilterCriteria>(initialSearchFilterCriteria)
  const [searchResults, setSearchResults] = useState<Person[]>(sortedItems)

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
      setSearchResults([])
      return
    }

    const newSearchResults = sortedItems.filter((sortedItem) => sortedItem[field as keyof Person].toString().toLowerCase().includes(value.toLowerCase()))

    setSearchResults(newSearchResults)
  }, [searchFilterCriteria])

  useEffect(() => {
  }, [searchResults])

  if (sortedItems.length === 0) {
    return <></>
  }

  return (
    <section className='flex flex-col gap-4 p-4'>
      <section className='flex flex-col gap-2'>
        <label className='text-xl font-bold'>Search:</label>
        <section className='flex gap-2'>
          <select
            onChange={onSearchFilterFieldChange}
            className='w-[12%] p-2 bg-sky-100 border border-sky-800'
          >
            {
              <>
                <option value=''>Choose a Field</option>
                {
                  Object.keys(people[0]).map((key) => (
                    <option
                      key={ key }
                      value={ key }
                    >
                      { key }
                    </option>
                  ))
                }
              </>
            }
          </select>
          <input
            type='text'
            className='w-[25%] border border-black py-2 px-3'
            value={searchFilterCriteria.value}
            onChange={onSearchFilterValueChange}
          />
        </section>
      </section>
      <table>
        <thead>
          <tr>
            {
              Object.keys(people[0]).map((key) => {
                if (!(selectedFields[key as keyof Person] as boolean)) {
                  return <React.Fragment key={ key }></React.Fragment>
                }

                return (
                  <th
                    key={ key }
                    className='p-2 border border-black'
                  >
                    <section className='flex gap-2 place-items-center'>
                      <span>{ key }</span>
                      <span
                        onClick={onSortingCriteriaElementClick(key as keyof Person)}
                        className='cursor-pointer'
                      >
                        {
                          (sortingCriterias[key as keyof Person])
                            ? <ArrowUpIcon style={{ width: '15px', height: '15px' }} />
                            : <ArrowDownIcon style={{ width: '15px', height: '15px' }} />
                        }
                      </span>
                    </section>
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
            {
              (searchResults.length !== 0 ? searchResults : sortedItems).map((sortedItem) => {
                return (<tr key={ sortedItem.id }>
                  {
                    Object.entries(sortedItem).map(([key, value]) => {
                      if (!(selectedFields[key as keyof Person] as boolean)) {
                        return <React.Fragment key={ uuidv4() }></React.Fragment>
                      }

                      return (<td
                        key={ uuidv4() }
                        className='p-2 border border-black'
                      >
                        { value }
                      </td>)
                    })
                  }
                </tr>)
              })
            }
        </tbody>
      </table>
    </section>
  )
}
