import { type FC } from 'react'
import { useModalStore } from '../hooks/useModalStore'
import { TemplateModal } from './TemplateModal'
import { FavoritesTable } from './'

export const CustomModal: FC = () => {
  const { component } = useModalStore()

  switch (component) {
    case 'favorites': {
      return (
        <TemplateModal>
          <FavoritesTable />
        </TemplateModal>
      )
    }
  }
}
