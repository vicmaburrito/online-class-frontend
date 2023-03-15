import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import CourseCard from '../components/CourseCard';
import FlashMessage from '../components/FlashMessage';

import {
  homepageCourseAPI,
  updateRightCourses,
  updateLeftCourses,
} from '../redux/reducers/homepageCourses';
import Spinner from '../components/Spinner';

function Homepage() {
  const signedIn = useSelector((state) => state.signedIn);
  const status = useSelector((state) => state.home.status);
  const courses = useSelector((state) => state.home.courses);
  const startPoint = useSelector((state) => state.home.startPoint);
  const dispatch = useDispatch();

  const visibleCourses = courses.filter(
    (t) => t.visible === true || window.screen.width < 500,
  );

  useEffect(() => {
    dispatch(homepageCourseAPI());
  }, []);

  return (
    <section className="mx-auto max-w-screen md:max-h-screen">
      <div className="mx-auto w-full flex flex-col p-10 mt-10 md:mt-0">
        <h1 className="mx-auto font-bold text-3xl text-black md:mt-[20px]">
          Our Courses
        </h1>
        <p className="mx-auto text-gray-dark">Please select one of our courses</p>
      </div>
      <div
        className="mx-auto w-full flex flex-col gap-4 md:flex-row
       md:justify-center md:items-center md:min-h-[70vh] md:gap-0"
      >
        <div className="hidden md:block">
          <button
            onClick={() => {
              if (startPoint > 0) {
                dispatch(updateLeftCourses());
              }
            }}
            type="button"
            className={`${status === 'Loading' || startPoint === 0 ? 'bg-gray' : 'bg-green'} text-white max-w-[100px] py-3 pl-8 pr-3 rounded-br-full rounded-tr-full font-semibold`}
          >
            <BiLeftArrow />
          </button>
        </div>

        {
          status === 'Loading'
            ? (
              <>
                <div className="md:h-[100px] flex-1 flex justify-center">
                  <Spinner />
                </div>
              </>
            )
            : visibleCourses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`} className="md:h-[420px] flex-1">
                <CourseCard
                  courseName={course.name}
                  courseDesc={course.description}
                />
              </Link>
            ))
        }

        <div className="hidden md:block">
          <button
            onClick={() => {
              if (startPoint < courses.length - 3) {
                dispatch(updateRightCourses());
              }
            }}
            type="button"
            className={`${status === 'Loading' || startPoint === courses.length - 3 ? 'bg-gray' : 'bg-green'} text-white max-w-[100px] py-3 pl-3 pr-8 rounded-bl-full rounded-tl-full  font-semibold`}
          >
            <BiRightArrow />
          </button>
        </div>
      </div>
      {signedIn === 'Waiting for confirmation' && (
        <FlashMessage
          title="Waiting for confirmation"
          className="text-orange"
          message="You will receive an email shortly containing an activation link. If you didn't receive the email please check your spam folder."
        />
      )}
    </section>
  );
}

export default Homepage;
