import host from './host';

const addCourseAPI = async (token, formData) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);

  const formdata = new FormData();

  formdata.append('name', formData.name);
  formdata.append('picture', formData.picture);
  formdata.append('description', formData.description);
  formdata.append('max_num_students', formData.max_num_students);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    `${host}/courses`,
    requestOptions,
  ).then((response) => response.text());
};

export default addCourseAPI;