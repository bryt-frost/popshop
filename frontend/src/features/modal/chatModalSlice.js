import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const chatModalSlice = createSlice({
  name: 'chatModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;

    },
    closeModal: (state) => {
      state.isOpen = false;

    },
  },
});

export const { openModal, closeModal } = chatModalSlice.actions;
export default chatModalSlice.reducer;
