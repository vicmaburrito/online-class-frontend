import { createAsyncThunk } from '@reduxjs/toolkit';

const makeReservation = createAsyncThunk(
  'reservation/postReservation',
  async (coursePackage) => {
    const response = await fetch('http://127.0.0.1:3000/enrollments', {
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
