import { createAsyncThunk } from '@reduxjs/toolkit';
import host from './host';

const makeReservation = createAsyncThunk(
  'reservation/postReservation',
  async (coursePackage) => {
    const response = await fetch(`${host}/enrollments`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
      body: JSON.stringify(coursePackage),
    });
    const data = await response.json();
    if (data.message !== 'Booked successfully.') {
      return 'Failure';
    }

    return data.message;
  },
);

export default makeReservation;
