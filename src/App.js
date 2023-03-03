import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
