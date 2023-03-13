import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllReversations } from '../redux/reducers/reserveSlice';
import ReservationItem from '../components/ReservationItem';
import '../Styles/reservations.css';

export default function Reservations() {
  const reservations = useSelector((store) => store.reserveItems.reserved);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReversations());
  }, [dispatch]);

  return (
    <ul className="my-reservations column">
      {reservations.map((reservation, index) => (
        <ReservationItem key={reservation.id} reservation={reservation} delay={`1.${index}`} />
      ))}
    </ul>
  );
}
