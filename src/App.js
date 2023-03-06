import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Classes from './components/Classes';
import Reservations from './components/Reservations';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => { }, [dispatch]);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
