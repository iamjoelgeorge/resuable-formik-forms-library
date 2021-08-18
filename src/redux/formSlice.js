import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {},
  reducers: {
    setFormData: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
