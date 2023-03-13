import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FETCH_SIGNATURES } from './signatureSlice';

export const getSingleSignature = createAsyncThunk(
  'signature/getSingleSignature',
  async (id) => {
    const response = await axios.get(`${FETCH_SIGNATURES}/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return response.data;
  },
);

const initialState = {
  signature: [],
  status: 'idle',
  error: null,
};

const signatureDetailSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSingleSignature, (state) => ({
        ...state,
        status: 'Loading',
      }))
      .addCase(getSingleSignature.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        signature: action.payload,
      }))
      .addCase(getSingleSignature.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const selectSignature = (state) => state.signature.signature;
export const getSignatureStatus = (state) => state.signature.status;
export const getSignatureError = (state) => state.signature.error;

export default signatureDetailSlice.reducer;
