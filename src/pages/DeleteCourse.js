import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import host from '../api/host';
import Container from '../components/Container';
import { fetchCourses } from '../redux/reducers/courses';

const DeleteCourse = () => {
  const token = useSelector((state) => state.token.userData.token);
  const courses = useSelector((state) => state.courses.package);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    };
    try {
      const response = await axios(`${host}/courses/${id}`, requestOptions);
      if (response.status === 204) {
        window.location.reload(); // Reload the page to reflect the new data
        return;
      }
    } catch (error) {
      // eslint-disable-next-line consistent-return
      return ('Error deleting course:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-center pt-12 text-2xl font-bold">Delete a Course</h1>
      {courses
        && courses.map((course, index) => (
          <div className="grid grid-cols-12 p-3 mb-2 border border-gray rounded items-center" data-id={course.id} key={course.id}>
            <span className="col-span-1 md:col-span-2">{index + 1}</span>
            <p className="col-span-8">{course.name}</p>
            {course.available && (
              <button
                type="submit"
                className="p-2 bg-red text-white text-sm col-span-3 rounded md:col-span-1"
                onClick={handleDelete}
                id={course.id}
              >
                Delete
              </button>
            )}
            {!course.available && (
              <div className="flex space-x-2 justify-center">
                <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red text-white rounded-full">
                  Removed
                </span>
              </div>
            )}
          </div>
        ))}
    </Container>
  );
};

export default DeleteCourse;
