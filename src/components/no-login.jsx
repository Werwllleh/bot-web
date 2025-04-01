import React from 'react';
import Loader from "./Loader/Loader";

const NoLogin = () => {
  return (
    <div className="no-login">
      <div className="no-login__text">
        <p>Что-то пошло не так...</p>
        <p>Попробуй позже</p>
      </div>
      <div className="no-login__loader">
        <Loader/>
      </div>
    </div>
  );
};

export default NoLogin;
