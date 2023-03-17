import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import host from '../../api/host';

export const homepageCourseAPI = createAsyncThunk('homecourse/courses', async () => {
  const response = await fetch(`${host}/courses`);
  const data = await response.json();
  return data;
});

const homeCourse = {
  startPoint: 0,
  status: 'Loading',
  courses: [],
};

export const homecourseSlice = createSlice({
  name: 'homecourse',
  initialState: homeCourse,
  reducers: {
    updateRightCourses: (state) => ({
      ...state,
      startPoint: state.startPoint + 1,
      courses: state.courses.map((el, i) => {
        if (i >= state.startPoint + 1 && i <= state.startPoint + 3) {
          return {
            ...el,
            visible: true,
          };
        }
        return {
          ...el,
          visible: false,
        };
      }),
    }),
    updateLeftCourses: (state) => ({
      ...state,
      startPoint: state.startPoint - 1,
      courses: state.courses.map((el, i) => {
        if (i >= state.startPoint - 1 && i <= state.startPoint + 1) {
          return {
            ...el,
            visible: true,
          };
        }
        return {
          ...el,
          visible: false,
        };
      }),
    }),
  },
  extraReducers: {
    [homepageCourseAPI.pending]: (state) => ({ ...state, status: 'Loading' }),
    [homepageCourseAPI.fulfilled]: (state, action) => ({
      ...state,
      courses: action.payload.map((course, i) => {
        if (i >= state.startPoint && i <= state.startPoint + 2) {
          return {
            ...course,
            visible: true,
          };
        }
        return {
          ...course,
          visible: false,
        };
      }),
      status: 'Success',
    }),
    [homepageCourseAPI.rejected]: (state) => ({ ...state, status: 'Failed' }),
  },
});

export const { updateRightCourses, updateLeftCourses } = homecourseSlice.actions;
export default homecourseSlice.reducer;
