import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getAllReversations } from './reserveSlice';

export const fetchSignIn = createAsyncThunk(
  'registration/signIn/fetch',
  async (
    {
      email, password, navigate,
    },
    { fulfillWithValue, rejectWithValue },
  ) => {
    const signInResponse = await fetch(
      'http://127.0.0.1:3000/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      },
    );
    const data = await signInResponse.json();
    if (signInResponse.status === 200) {
      navigate('/courses');
      return fulfillWithValue(data);
    }
    return rejectWithValue({
      ...data,
      status: signInResponse.status,
    });
  },
);

export const signInReducer = (builder) => {
  builder
    .addCase(fetchSignIn.pending, (state) => {
      const newState = { ...state, loading: true };
      return newState;
    })
    .addCase(fetchSignIn.fulfilled, (state, action) => {
      const dispatch = useDispatch();
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      const newState = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      };

      dispatch(getAllReversations);

      return newState;
    })
    .addCase(fetchSignIn.rejected, (state, action) => {
      if (action.payload && action.payload.status) {
        const newState = {
          ...state,
          error: {
            msg: action.payload.msg,
            value: action.payload.error.value,
            details: action.payload.error.details,
          },
          loading: false,
        };
        return newState;
      }
      const newState = { ...state, error: 'Error 404. Failed to fetch', loading: false };
      return newState;
    });
};
