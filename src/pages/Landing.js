import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/landing.css';

export default function Landing() {
  return (
    <section className="landing_page">
      <div className="heading">
        <Link to="/sign-up" className="logo">Logo</Link>
        <div className="title">
          <div className="text">
            <h1>
              Online Classes
            </h1>
          </div>
          <div className="list_btn">
            <button type="button" className="sign_up_btn">
              <Link to="/Sign-up"><span>Sign Up</span></Link>
            </button>
            <button type="button" className="sign_in_btn">
              <Link to="/Sign-in"><span>Sign In</span></Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
