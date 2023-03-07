import { configureStore } from '@reduxjs/toolkit';
import reserveItems from './reducers/reserveSlice';
import registrationSlice from './reducers/registrationSlice';

const store = configureStore({
  reducer: {
    reserveItems,
    registration: registrationSlice,
  },
});

export default store;
