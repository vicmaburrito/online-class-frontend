import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSignUp } from '../redux/reducers/signUp';
import { setError } from '../redux/reducers/registrationSlice';

const SignUpForm = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordInput(event.target.value);
  };

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  const toggleConfirmPassword = () => {
    if (confirmPasswordType === 'password') {
      setConfirmPasswordType('text');
      return;
    }
    setConfirmPasswordType('password');
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name && email && passwordInput && confirmPasswordInput) {
      if (passwordInput !== confirmPasswordInput) {
        dispatch(
          setError({
            msg: 'Unable to create an account',
            value: 'Passwords do not match',
            details: [],
          }),
        );
      } else {
        dispatch(fetchSignUp({
          name, email, password: passwordInput, confirmPassword: confirmPasswordInput, navigate,
        }));
      }
    } else {
      dispatch(
        setError({
          msg: 'Cannot submit',
          value: 'Please fill all fields',
          details: [],
        }),
      );
    }
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">
          <input type="text" name="name" required="required" id="name" onChange={changeName} value={name} />
          <span>Full Name</span>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="email">
          <input type="email" name="email" required="required" id="email" onChange={changeEmail} value={email} />
          <span>Email</span>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          <input type={passwordType} name="password" required="required" onChange={handlePasswordChange} value={passwordInput} />
          <span>Password</span>
          <button type="button" className="btn" onClick={togglePassword}>
            {passwordType === 'password' ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          <input type={confirmPasswordType} name="password" required="required" onChange={handleConfirmPasswordChange} value={confirmPasswordInput} />
          <span>Confirm Password</span>
          <button type="button" className="btn" onClick={toggleConfirmPassword}>
            {confirmPasswordType === 'password' ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </label>
      </div>
      <button type="submit" className="submit-btn" onClick={onSubmit}><span>Sign up</span></button>
    </form>
  );
};

export default SignUpForm;
