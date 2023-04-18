import { type FC } from 'react'
import { useModalStore } from '../hooks/useModalStore'
import { TemplateModal } from './TemplateModal'

export const CustomModal: FC = () => {
  const { component } = useModalStore()

  switch (component) {
    case 'favorites': {
      return (
        <TemplateModal>
          <h1>Favorites</h1>
        </TemplateModal>
      )
    }
  }
}
