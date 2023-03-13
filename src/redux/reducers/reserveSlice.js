import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const defaultSlice = {
  reserved: [],
};

export const getAllReversations = createAsyncThunk(
  'user/reservations',
  async () => {
    const data = await fetch(
      '[URL to get all reservations]',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const response = data.json();

    return response;
  },
);

const reserveSlice = createSlice({
  name: 'reservations',
  initialState: defaultSlice,
  reducers: {
    addReserveItem: (state, action) => {
      state.reserved.push(action.payload);
    },
  },
  extraReducers: {
    [getAllReversations.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.reserved = action.payload;
    },
  },
});

export const { addReserveItem } = reserveSlice.actions;
export default reserveSlice.reducer;
