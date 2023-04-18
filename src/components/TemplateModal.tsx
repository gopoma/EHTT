import { type FC, type CSSProperties } from 'react'
import Modal from 'react-modal'
import { useModalStore } from '../hooks/useModalStore'

interface Props {
  children: JSX.Element | JSX.Element
}

const customStyles: { content: CSSProperties } = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto'
  }
}

export const TemplateModal: FC<Props> = ({ children }) => {
  const { isModalOpen, closeModal } = useModalStore()

  const onCloseModal = (): void => {
    closeModal()
  }

  return (
    <Modal
      isOpen={ isModalOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={ 200 }
    >
      { children }
    </Modal>
  )
}
