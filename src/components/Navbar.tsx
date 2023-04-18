import { type FC } from 'react'
import { useModalStore } from '../hooks/useModalStore'

export const Navbar: FC = () => {
  const { openModal } = useModalStore()

  const onClick = (): void => {
    openModal()
  }

  return (
    <nav className='p-4 flex gap-4'>
      <h2 className='text-3xl font-bold'>EHTT</h2>
      <button
        className='bg-blue-600 hover:bg-blue-800 transition-colors text-white font-bold py-2 px-3 rounded'
        onClick={ onClick }
      >
        Favorites
      </button>
    </nav>
  )
}
