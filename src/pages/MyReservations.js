import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from '../components/CourseCard';
import getReservations from '../api/MyReservation';

function MyReservations() {
  const reservations = useSelector(
    (state) => state.myReservations.reservations,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservations());
  }, []);

  return (
    <section className="w-screen relative flex flex-col justify-center min-h-screen bg-opacity-80 md:w-full md:pb-1 mb:overflow-scroll">
      <div className="mx-auto w-full flex flex-col p-10">
        <h1 className="mx-auto font-bold text-2xl text-black pb-5">
          Your Reservations
        </h1>
        <hr className="w-1/4 mx-auto" />
      </div>
      <div className="w-full flex flex-wrap gap-5 justify-center md:h-[500px] md:w-full">
        {reservations.map((reservation) => (
          <CourseCard
            key={reservation.reseravation_id}
            courseName={reservation.course_name}
            courseImage={reservation.course_images[0]}
            courseLocale={reservation.course_location}
            courseDate={reservation.course_date}
            coursePackage={reservation.package}
          />
        ))}
      </div>
    </section>
  );
}

export default MyReservations;
