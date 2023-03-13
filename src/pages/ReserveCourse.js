/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/reservation.css';

export default function ReserveForm({ course, courses }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const departureCity = useRef('');
  const timeRef = useRef('');
  const dateRef = useRef('');
  const courseIdRef = useRef('');

  const reserveHandler = () => {
    if (courseIdRef.current.value === '' || departureCity.current.value === ''
      || timeRef.current.value === '' || dateRef.current.value === '') {
      return;
    }

    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:3000/enrollments', {
      method: 'POST',
      body: JSON.stringify({
        user_id: user.id,
        course_id: courseIdRef.current.value,
        city_id: departureCity.current.value,
        date: dateRef.current.value,
        time: timeRef.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch(() => {
        navigate('/home');
      });

    navigate('/reservations');
  };

  const destination = course?.destination_city[0].toUpperCase() + course?.destination_city.slice(1);

  return (
    <div className="reserve__container column">
      {course !== undefined ? <h1 className="reserve_title">{destination}</h1> : <h1 className="reserve_title" data-testid="reserve-title">Reserve a course</h1>}
      {course !== undefined && (
        <p className="reserve_subtitle">
          {`${course?.destination_city} - ${course?.description}`}
        </p>
      )}
      <form className="reserve_form column" data-testid="form">
        <div className="first-row row">
          <input
            className="username"
            type="username"
            name="username"
            defaultValue={user.name}
            required
          />

          <select
            className="course-input"
            ref={courseIdRef}
            required
            defaultValue={course?.id === undefined ? '' : course?.id}
          >
            <option value="">Select</option>
            {
              courses?.map((t) => (
                <option
                  value={t?.id}
                  key={t?.id}
                >
                  {t.destination_city}
                </option>
              ))
            }
          </select>
        </div>
        <select className="departure-city-input" ref={departureCity} required defaultValue="">
          <option value="">Select Departure City</option>
          <option value="Sulaimaniyah">Sulaimaniyah</option>
          <option value="Erbil">Erbil</option>
        </select>
        <input type="time" ref={timeRef} required className="reserve-form-time" />
        <input type="date" ref={dateRef} required className="reserve-form-date" />
        <button type="button" onClick={reserveHandler} className="reserve-btn" data-testid="reserve-btn">
          Reserve
        </button>
      </form>
    </div>
  );
}
