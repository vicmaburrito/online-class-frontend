import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCourses } from '../redux/reducers/courseSlice';

import '../Styles/reservations_item.css';

export default function ReservationItem({ delay, reservation }) {
  const styles = {
    animationDuration: `${delay}s`,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const courses = useSelector((state) => state.courses.courses);

  const course = courses.find((course) => course.id === reservation.course_id);

  return (
    <li className="reservation-item row" style={styles}>
      <h1>reservation Item</h1>
    </li>
  );
}
