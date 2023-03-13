/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('http://127.0.0.1:3000/courses', config);
  return response.data;
});

export const addCourse = createAsyncThunk('courses/addCourse', async (courseData) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('course[price]', courseData.get('price'));
  formData.append('course[rating]', courseData.get('rating'));
  formData.append('course[destination_city]', courseData.get('destination_city'));
  formData.append('course[description]', courseData.get('description'));
  formData.append('course[user_id]', courseData.get('user_id'));

  formData.append('image', courseData.get('image'));

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post('http://127.0.0.1:3000/courses/', formData, config);
  return response.data;
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  const token = localStorage.getItem('token');
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    crossdomain: true,
  };
  await axios.delete(`http://127.0.0.1:3000/courses/${courseId}`, config);
  return {
    id: courseId,
  };
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: null,
  },
  reducers: {
    courseAdded(state, action) {
      state.courses.push(action.payload);
    },
  },
  extraReducers: {
    [fetchCourses.pending]: (state) => {
      state.status = 'loading';
    },

    [fetchCourses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.courses = action.payload;
    },

    [fetchCourses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [addCourse.pending]: (state) => {
      state.status = 'loading';
    },

    [addCourse.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.courses.push(action.payload);
    },

    [addCourse.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [deleteCourse.pending]: (state) => {
      state.status = 'loading';
    },

    [deleteCourse.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.courses = state.courses.filter((course) => course.id !== action.payload.id);
    },

    [deleteCourse.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { courseAdded } = courseSlice.actions;

export default courseSlice.reducer;
