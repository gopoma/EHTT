import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isModalOpen: boolean
  component: ComponentType
}

export type ComponentType = 'favorites'

const initialState: ModalState = {
  isModalOpen: false,
  component: 'favorites'
}

export const modalSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenModal: (state) => {
      state.isModalOpen = true
    },
    onCloseModal: (state) => {
      state.isModalOpen = false
    },
    onComponentChange: (state, { payload }: PayloadAction<ComponentType>) => {
      state.component = payload
    }
  }
})

export default modalSlice.reducer

export const { onOpenModal, onCloseModal, onComponentChange } = modalSlice.actions
