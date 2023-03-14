import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import NavButton from '../components/NavButton';
// import Carousel from '../components/Carousel';
import { setCourseDetail, setCourseLoading } from '../redux/reducers/course';
import Spinner from '../components/Spinner';
import host from '../api/host';

const CourseDetails = () => {
  const course = useSelector((state) => state.course.courseDetail);
  const loading = useSelector((state) => state.course.loading);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem('user'));
  const myHeaders = new Headers();
  myHeaders.append('Authorization', userData.token);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  useEffect(() => {
    fetch(`${host}/courses/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setCourseDetail(result));
        dispatch(setCourseLoading(false));
      })
      .catch((error) => error);
  }, []);
  return (
    <section
      id="details"
      className="flex flex-col min-h-screen max-w-screen relative p-3 mt-12"
    >
      {!loading
        ? (
          <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
            <div className="md:w-3/5 md:mx-auto">
              {/* <Carousel images={course.image_urls.map((el, i) => ({ id: i, src: el }))} /> */}
            </div>
            <div className="sidebar mt-4 md:w-[20%] md:flex-none">
              <h2 className="font-semibold text-2xl md:text-4xl text-center md:text-end mb-4">
                {course.name}
              </h2>
              <ul>
                <li className="bg-gray">
                  <p className="text-lg p-2">
                    {course.description}
                  </p>
                </li>
                <li className="bg-gray">
                  <p className="text-lg p-2">
                    Studends:
                    {course.max_num_students}
                  </p>
                </li>
                <li className="mt-4">
                  <p className="break-spaces">{course.description}</p>
                </li>
                <li className="mt-4 mb-12 flex justify-end">
                  <Link to="/reservation/new">
                    <Button
                      btnName="Reserve Course"
                      btnType="button"
                      bgColor="bg-green text-white ml-auto"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : <Spinner />}
      <Link to="/" title="Back" className="mt-4 absolute bottom-4 left-0">
        <NavButton btnDirection="left" bgColor="bg-green text-white" />
      </Link>
    </section>
  );
};

export default CourseDetails;
