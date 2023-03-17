import host from './host';

const deleteCourseAPI = async (token, id) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `${host}/courses/${id}`,
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => error);
};

export default deleteCourseAPI;
