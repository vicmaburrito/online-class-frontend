import { configureStore } from '@reduxjs/toolkit';
import reserveItems from './reducers/reserveSlice';
import registrationSlice from './reducers/registrationSlice';
import courseSlice from './reducers/courseSlice';

const store = configureStore({
  reducer: {
    reserveItems,
    courses: courseSlice,
    registration: registrationSlice,
  },
});

export default store;
