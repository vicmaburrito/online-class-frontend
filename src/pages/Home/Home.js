import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="first-block" id="Home">
    <div className="container px-4 px-lg-5 text-center">
      <div className="scale-down-center justify-center">
        <h1 className="mx-auto font-bold text-7xl text-white pb-5">
          Online Courses
        </h1>
        <Link to="/courses" className="bg-green-800 text-white mt-5 py-1 px-5 rounded font-semibold my-auto text-center">
          Let&apos;s Start
        </Link>
      </div>
    </div>
  </section>
);

export default Home;
