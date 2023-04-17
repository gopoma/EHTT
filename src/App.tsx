import { useEffect, useState } from 'react'
import { SortTable } from './components'
import { getPeople } from './services'
import { type Person } from './interfaces'

function App (): JSX.Element {
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    getPeople()
      .then((results) => { setPeople(results) })
      .catch(console.log)
  }, [])

  if (people.length === 0) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1 className='text-3xl'>EHTT</h1>

      <SortTable items={people} />
    </>
  )
}

export default App
