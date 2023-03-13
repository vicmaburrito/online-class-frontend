import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCourses } from '../redux/reducers/courseSlice';
import '../Styles/reserve.css';

export default function ReserveTrip() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const status = useSelector((state) => state.courses.status);
  const courses = useSelector((state) => state.courses.courses);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const course = courses.find((trip) => trip.id === +id);

  return (
    <form className="reserve_form column">
      <div className="first-row row">
        <input
          className="username"
          type="username"
          name="username"
          defaultValue={user.name}
          required
        />

        <select
          className="trip-input"
          ref={courseId}
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
                {t.city}
              </option>
            ))
          }
        </select>
      </div>
      <select className="departure-city-input" ref={city} required defaultValue="">
        <option value="">Select City</option>
        <option value="Sulaimaniyah">city 1</option>
        <option value="Erbil">city 2</option>
      </select>
      <input type="time" ref={time} required />
      <input type="date" ref={date} required />
      <button type="button" onClick={reserveHandler} className="reserve-btn">
        Reserve
      </button>
    </form>
  );
}
