export const GET_SIGNIN_STATUS = 'OnlineCourse/sign_up/GET_SIGNIN_STATUS';

const usersReducer = (state = 'Not signed in', action) => {
  switch (action.type) {
    case GET_SIGNIN_STATUS: {
      return action.signedIn;
    }
    default:
      return state;
  }
};

export const updateSignedInStatus = (signedIn) => ({ type: GET_SIGNIN_STATUS, signedIn });

export default usersReducer;
