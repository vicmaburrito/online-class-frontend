import { createSlice } from '@reduxjs/toolkit';
import { signUpThunkReducers } from './signUp';
import { signInReducer } from './signIn';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || {},
  loading: false,
  error: {
    msg: '',
    value: '',
    details: [],
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const newState = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
      return newState;
    },
    setError: (state, action) => {
      const newState = {
        ...state,
        error: {
          msg: action.payload.msg,
          value: action.payload.value,
          details: action.payload.details,
        },
      };
      return newState;
    },
  },
  extraReducers: (builder) => {
    signUpThunkReducers(builder);
    signInReducer(builder);
  },
});

export default registrationSlice.reducer;
export const { setToken, setError } = registrationSlice.actions;
