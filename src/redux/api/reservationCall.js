const reserveCourse = async () => {
  const response = await fetch('http://127.0.0.1:3000/');
  const reservationStatus = await response.json;
  return reservationStatus;
};

export default reserveCourse;
