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
    `http://127.0.0.1:3000/courses/${id}`,
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => error);
};

export default deleteCourseAPI;
