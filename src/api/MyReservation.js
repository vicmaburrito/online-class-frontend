import { createAsyncThunk } from '@reduxjs/toolkit';
import host from './host';

const getReservations = createAsyncThunk(
  'myReservations/getReservations',
  async () => {
    const response = await fetch(`${host}/enrollments`, {
      method: 'GET',
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
    });
    const data = await response.json();
    return data;
  },
);

export default getReservations;
