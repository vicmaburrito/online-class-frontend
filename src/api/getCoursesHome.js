import host from './host';

const getAPIdata = async () => {
  await fetch(`${host}/courses`)
    .then((response) => response.json())
    .then((data) => data);
};

export default getAPIdata;
