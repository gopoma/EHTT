import { type FC } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { type Item } from '../interfaces'
import { ArrowDownIcon, ArrowUpIcon } from './icons'
import { useSortTable } from '../hooks'

interface Props {
  items: Item[]
}

export const SortTable: FC<Props> = ({ items }) => {
  const {
    $items,
    sortingCriterias,
    onSortingCriteriaElementClick
  } = useSortTable({ items })

  if ($items.length === 0 || sortingCriterias === null) {
    return <></>
  }

  const [$firstItem] = $items

  return (
    <>
      <table>
        <thead>
          <tr>
            {
              Object.keys($firstItem).map((key) => (
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
              $items.map(($item) => (
                <tr key={ uuidv4() }>
                  {
                    Object.values($item).map((value) => (
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
