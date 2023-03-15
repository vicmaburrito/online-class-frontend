/* eslint-disable import/extensions */
import { CHANGE_USER_STATUS, GET_USER_DATA } from '../redux/reducers/token';
import { updateSignedInStatus } from '../redux/reducers/users';
import store from '../redux/store';

const SignInUser = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const response = await fetch(
    'http://127.0.0.1:5000/auth/login',
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formData),
    },
  );

  const result = await response.json();
  localStorage.setItem('user', JSON.stringify(result));
  store.dispatch(GET_USER_DATA(result));
  store.dispatch(CHANGE_USER_STATUS(true));
  store.dispatch(updateSignedInStatus('Signed in'));
};

export default SignInUser;
