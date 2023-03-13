import { createAsyncThunk } from '@reduxjs/toolkit';

const getReservations = createAsyncThunk(
  'myReservations/getReservations',
  async () => {
    const response = await fetch('http://127.0.0.1:3000/enrollments', {
      method: 'GET',
      headers: {
        // accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
    });
    const data = await response.json();
    return data;
  },
);

export default getReservations;
