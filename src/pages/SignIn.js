import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import Error from '../components/Error';
import '../Styles/registration.css';

const SignIn = () => (
  <section className="session-page">
    <div className="form-container">
      <h1>Sign In</h1>
      <Error />
      <SignInForm />
      <p>
        Do not have an account?
        <Link to="/sign-up" className="link">Sign Up</Link>
      </p>
    </div>
  </section>
);

export default SignIn;
