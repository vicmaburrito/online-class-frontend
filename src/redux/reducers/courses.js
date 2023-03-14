import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import deleteCourseAPI from '../../api/deleteCourse';
import addCourseAPI from '../../api/addCourse';
import host from '../../api/host';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get(`${host}/courses`);
  const data = await response.data;
  return data;
});

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async ({ token, id }, { rejectWithValue }) => {
    const data = await deleteCourseAPI(token, id);
    if (data.includes('Deleted successfully')) {
      return { id };
    }
    return rejectWithValue("You don't have enough permissions");
  },
);

export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async ({ token, formData }, { rejectWithValue }) => {
    const res = await addCourseAPI(token, formData);

    if (res.includes('Course was created succesfully')) {
      return res;
    }

    return rejectWithValue('Course not created');
  },
);

/* eslint no-param-reassign: "error" */

export const courses = createSlice({
  name: 'courses',
  initialState: {
    package: [],
    status: null,
  },
  reducers: {
    setState: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [fetchCourses.pending]: (state) => {
      state.status = 'Loading';
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.package = action.payload.map((data) => ({
        ...data,
        available: true,
      }));
      state.status = 'Success';
    },
    [fetchCourses.rejected]: (state) => {
      state.status = 'Failed';
    },
    [deleteCourse.pending]: (state) => {
      state.status = 'Loading';
    },
    [deleteCourse.fulfilled]: (state, action) => {
      state.package = state.package.map((data) => {
        if (action.payload.id === data.id) {
          data.available = false;
        }
        return data;
      });
      state.status = 'Deleted';
    },
    [deleteCourse.rejected]: (state) => {
      state.status = 'Failed';
    },
    [addCourse.fulfilled]: (state) => {
      state.status = 'Added';
    },
    [addCourse.rejected]: (state) => {
      state.status = 'Course not created';
    },
  },
});

export const { setState } = courses.actions;
export default courses.reducer;
