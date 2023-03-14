import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/users';
import reservationReducer from './reducers/reservation';
import tokenReducer from './reducers/token';
import coursesReducer from './reducers/courses';
import homecourseReducer from './reducers/homepageCourses';
import courseReducer from './reducers/course';
import myReservationReducer from './reducers/myReservation';

const store = configureStore({
  reducer: {
    signedIn: usersReducer,
    reservation: reservationReducer,
    token: tokenReducer,
    courses: coursesReducer,
    home: homecourseReducer,
    course: courseReducer,
    myReservations: myReservationReducer,
  },
});


