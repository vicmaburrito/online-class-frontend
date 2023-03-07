import './App.css';
import {
  Route, useNavigate, Routes,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import { setToken } from './redux/reducers/registrationSlice';
import Landing from './pages/Landing';

const App = () => {
  const registration = useSelector((store) => store.registration);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setToken({
        token,
        user,
      });
    } else if (window.location.pathname !== '/sign-in' && window.location.pathname !== '/sign-up') {
      navigate('/sign-in');
    }
  }, [registration, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/sign-in" element={<SignIn />} />
      {/* <Route path="/" element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add-class" element={<AddClass />} />
          <Route path="/classes/:id" element={<DetailsPage />} />
          <Route path="/delete-class" element={<DeleteClass />} />
          <Route path="/home/:id/reserve" element={<ReserveClass />} />
          <Route path="/reservations" element={<Resevations />} />
        </Route> */}
    </Routes>
  );
};

export default App;
