import React from 'react';
import { useSelector } from 'react-redux';

export default function Error() {
  const ErrorHandler = useSelector((state) => state.registration.error);

  return (
    <div className="error-handler">
      <div>
        <span className="error-msg">{ErrorHandler.msg}</span>
        {' '}
        <span className="error-msg">{ErrorHandler.value}</span>
        <p className="error-msg">{ErrorHandler.details.join('')}</p>
      </div>
    </div>
  );
}
