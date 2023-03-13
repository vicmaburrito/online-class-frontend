import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = '';
export const FETCH_SIGNATURES = `${URL}/signatures`;

const CREATE_SIGNATURES_URL = '';

const initialState = {
  signatures: [],
  status: 'idle',
  error: null,
  isSignaturesCreated: false,
};

export const createSignatures = createAsyncThunk('create_signature', async (signatureInfo) => {
  const res = fetch(CREATE_SIGNATURES_URL, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(signatureInfo),
  });
  const data = (await res).json();
  return data;
});

export const getSignatures = createAsyncThunk('signatures/getSignatures', async () => {
  const response = await axios.get(FETCH_SIGNATURES, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  return response.data;
});

export const removeSignatures = createAsyncThunk('signatures/removeSignatures', async (id) => {
  await axios.delete(`${FETCH_SIGNATURES}/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  return id;
});

const signatureSlice = createSlice({
  name: 'signatures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSignatures.fulfilled, (state, action) => ({
        ...state,
        isSignatureCreated: action.payload.status.success,
      }))
      .addCase(getSignatures.pending, (state) => ({
        ...state,
        status: 'Loading',
      }))
      .addCase(getSignatures.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        signatures: action.payload,
      }))
      .addCase(getSignatures.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(removeSignatures.fulfilled, (state, action) => {
        const signatures = state.signatures.filter((signature) => signature.id !== action.payload);
        return {
          ...state,
          signatures,
        };
      });
  },
});

export const selectSignature = (state) => state.signature.signature;
export const getSignatureStatus = (state) => state.signaure.status;
export const getSignatureError = (state) => state.signature.error;

export default signatureSlice.reducer;
