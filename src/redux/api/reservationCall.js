import host from '../../api/host';

const reserveCourse = async () => {
  const response = await fetch(`${host}`);
  const reservationStatus = await response.json;
  return reservationStatus;
};

export default reserveCourse;
