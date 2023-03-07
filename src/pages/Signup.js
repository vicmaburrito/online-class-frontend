import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import Error from '../components/Error';
import '../Styles/registration.css';

const SignUp = () => (
  <section className="session-page">
    <div className="form-container">
      <h1>Sign Up</h1>
      <Error />
      <SignUpForm />
      <p>
        Already have an account?
        <Link to="/sign-in" className="link">Sign In</Link>
      </p>
    </div>
  </section>
);

export default SignUp;
