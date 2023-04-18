import { type FC } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useFavoritesStore, useSearching, useSorting } from '../hooks'
import { type Person } from '../interfaces'
import { ArrowDownIcon, ArrowUpIcon } from './icons'

const selectedFields: Array<keyof Person> = ['name', 'category', 'company', 'happinessLevel']

export const FavoritesTable: FC = () => {
  const { favorites, startTogglingFavorite } = useFavoritesStore()

  const { searchFilterCriteria, searchResults, onSearchFilterFieldChange, onSearchFilterValueChange } = useSearching<Person>({ items: favorites })
  const { sortedItems, sortingCriterias, onSortingCriteriaElementClick } = useSorting<Person>({ items: searchResults })

  const onDeleteFavoriteElementClick = (favorite: Person) => () => {
    startTogglingFavorite(favorite)
  }

  return (
    <section className='flex flex-col gap-4 p-4'>
      <section className='flex flex-col gap-2'>
        <label className='text-xl font-bold'>Search:</label>
        <section className='flex gap-2'>
          <select
            onChange={onSearchFilterFieldChange}
            className='w-[45%] p-2 bg-sky-100 border border-sky-800'
          >
            {
              <>
                <option value=''>Choose a Field</option>
                {
                  selectedFields.map((key) => (
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
            className='w-[45%] border border-black py-2 px-3 disabled:bg-slate-200'
            value={searchFilterCriteria.value}
            onChange={onSearchFilterValueChange}
            disabled={searchFilterCriteria.field === ''}
          />
        </section>
      </section>
      <table>
        <thead>
          <tr>
            <th className='p-2 border border-black'>Actions</th>
            {
              selectedFields.map((key) => (
                <th
                  key={ key }
                  className='p-2 border border-black'
                >
                  <section className='flex gap-2 place-items-center'>
                    <span>{ key }</span>
                    <span
                      onClick={onSortingCriteriaElementClick(key)}
                      className='cursor-pointer'
                    >
                      {
                        (sortingCriterias[key])
                          ? <ArrowUpIcon style={{ width: '15px', height: '15px' }} />
                          : <ArrowDownIcon style={{ width: '15px', height: '15px' }} />
                      }
                    </span>
                  </section>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
            {
              (sortedItems).map((sortedItem) => {
                return (<tr key={ sortedItem.id }>
                  {
                    <>
                      <td
                        key={ uuidv4() }
                        className='p-2 border border-black'
                      >
                        <section className='flex justify-center items-center'>
                          <button
                            className='bg-red-600 hover:bg-red-800 transition-colors text-white font-bold py-2 px-3'
                            onClick={onDeleteFavoriteElementClick(sortedItem)}
                          >
                            Delete
                          </button>
                        </section>
                      </td>
                      {
                        selectedFields.map((key) => (
                          <td
                            key={ uuidv4() }
                            className='p-2 border border-black'
                          >
                            { sortedItem[key] }
                          </td>)
                        )
                      }
                    </>
                  }
                </tr>)
              })
            }
        </tbody>
      </table>
    </section>
  )
}
