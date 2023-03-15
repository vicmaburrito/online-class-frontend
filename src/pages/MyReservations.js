import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import getReservations from '../api/MyReservation';
import host from '../api/host';

function MyReservations() {
  const reservations = useSelector(
    (state) => state.myReservations.reservations,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservations());
  }, []);

  const handleRemove = (e) => {
    const { id } = e.target;
    const userData = JSON.parse(localStorage.getItem('user'));
    const myHeaders = new Headers();
    myHeaders.append('Authorization', userData.token);
    myHeaders.append('Content-Type', 'application/json');
    console.log(myHeaders);
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    const deleteReservation = async (id, requestOptions) => {
      const response = await axios(`${host}/enrollments/${id}`, requestOptions);
      return response;
    };
    deleteReservation(id, requestOptions);
  };

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
          <div key={reservation.enrollment_id}>
            <CourseCard
              courseName={reservation.name}
              courseDesc={reservation.description}
              courseImage={reservation.picture}
              courseDate={reservation.sign_up_date}
              cityID={reservation.city_id.toString()}
            />
            <button type="submit" id={reservation.enrollment_id} className="btn-red text-white mt-5 bg-red py-1 px-5 rounded font-semibold my-auto text-center" onClick={handleRemove}>
              Cancel Enrollment
            </button>
          </div>

        ))}
      </div>
    </section>
  );
}

export default MyReservations;
