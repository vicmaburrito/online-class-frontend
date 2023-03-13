const getAPIdata = async () => {
  await fetch('http://127.0.0.1:3000/courses')
    .then((response) => response.json())
    .then((data) => data);
};

export default getAPIdata;
