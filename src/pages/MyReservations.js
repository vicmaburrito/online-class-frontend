import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleRemove = async (e) => {
    const { id } = e.target;
    const userData = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    };

    try {
      const response = await axios(`${host}/enrollments/${id}`, requestOptions);
      if (response.status === 204) {
        navigate('/courses'); // Reload the page to reflect the new data
        return;
      }
    } catch (error) {
      // eslint-disable-next-line consistent-return
      return ('Error deleting reservation:', error);
    }
  };

  // eslint-disable-next-line camelcase
  function formatDate(sign_up_date) {
    const date = new Date(sign_up_date);
    const day = date.toLocaleString('default', { day: 'numeric' });
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  return (
    <section className="w-screen relative flex flex-col justify-center min-h-screen bg-opacity-80 md:w-full md:pb-1 mb:overflow-scroll">
      <div className="mx-auto w-full flex flex-col p-10">
        <h1 className="mx-auto font-bold text-2xl text-black pb-5">
          Your Reservations
        </h1>
        <hr className="w-1/4 mx-auto" />
      </div>
      {reservations.length > 0 ? (
        <div className="w-full flex flex-wrap gap-5 justify-center md:h-[500px] md:w-full">
          {reservations.map((reservation) => (
            <div key={reservation.enrollment_id}>
              <div>
                <CourseCard
                  courseName={reservation.name}
                  courseDesc={reservation.description}
                  courseImage={reservation.picture}
                  courseDate={formatDate(reservation.sign_up_date)}
                  cityID={reservation.city_id.toString()}
                />
                <button type="submit" id={reservation.enrollment_id} className=" ml-16 btn-red text-white mt-5 bg-red py-1 px-5 rounded font-semibold my-auto text-center" onClick={handleRemove}>
                  Cancel Enrollment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-5 justify-center md:h-[500px] md:w-full">
          <h1 className="text-dark">No reservation so far</h1>
        </div>
      )}

    </section>
  );
}

export default MyReservations;
