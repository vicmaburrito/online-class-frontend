import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import signaturesReducer from './signatures/signatureSlice';
// import reservations from './reservations/reservationSlice';
// import user from './users/usersSlice';
import signatureReducer from './signatures/signatureDetailSlice';

const store = configureStore(
  {
    reducer: {
      signatures: signaturesReducer,
      //   reservations,
      signature: signatureReducer,
    //   user,
    },
  },
  applyMiddleware(thunk),
);

export default store;
