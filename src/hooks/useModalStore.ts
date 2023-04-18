import { type ComponentType, onCloseModal, onOpenModal, onComponentChange } from '../store'
import { useAppDispatch, useAppSelector } from './useStore'

// eslint-disable-next-line
export const useModalStore = () => {
  const dispatch = useAppDispatch()
  const { isModalOpen, component } = useAppSelector((state) => state.modal)

  const openModal = (): void => {
    dispatch(onOpenModal())
  }

  const closeModal = (): void => {
    dispatch(onCloseModal())
  }

  const changeComponent = (component: ComponentType): void => {
    dispatch(onComponentChange(component))
  }

  return {
    isModalOpen,
    component,

    openModal,
    closeModal,
    changeComponent
  }
}
