import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSignUp = createAsyncThunk(
  'registration/signUp/fetch',
  async (
    {
      name, email, password, confirmPassword, navigate,
    },
    { fulfillWithValue, rejectWithValue },
  ) => {
    const signUpResponse = await fetch(
      'http://127.0.0.1:3000/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            confirmPassword,
          },
        }),
      },
    );
    const data = await signUpResponse.json();
    if (signUpResponse.status === 200) {
      navigate('/courses');
      return fulfillWithValue(data);
    }
    return rejectWithValue({
      ...data,
      status: signUpResponse.status,
    });
  },
);

export const signUpThunkReducers = (builder) => {
  builder
    .addCase(fetchSignUp.pending, (state) => {
      const newState = { ...state, loading: true };
      return newState;
    })
    .addCase(fetchSignUp.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      const newState = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      };
      return newState;
    })
    .addCase(fetchSignUp.rejected, (state, action) => {
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
      const newState = {
        ...state,
        error: 'Error 404. Failed to fetch',
        loading: false,
      };
      return newState;
    });
};
