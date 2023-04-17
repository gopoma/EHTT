import { useState, type FC, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ArrowDownIcon, ArrowUpIcon } from './icons'
import { useSorting } from '../hooks'
import { type Person } from '../interfaces'
import { getPeople } from '../services'

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

  if (sortedItems.length === 0) {
    return <></>
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {
              Object.keys(people[0]).map((key) => (
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
              ))
            }
          </tr>
        </thead>
        <tbody>
            {
              sortedItems.map((sortedItem) => (
                <tr key={ uuidv4() }>
                  {
                    Object.values(sortedItem).map((value) => (
                      <td
                        key={ uuidv4() }
                        className='p-2 border border-black'
                      >
                        { value }
                      </td>
                    ))
                  }
                </tr>
              ))
            }
        </tbody>
      </table>
    </>
  )
}
