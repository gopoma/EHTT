import { useEffect } from 'react'
import { getPeople } from './services'

function App (): JSX.Element {
  useEffect(() => {
    getPeople()
      .then(console.log)
      .catch(console.log)
  }, [])

  return (
    <>
    </>
  )
}

export default App
