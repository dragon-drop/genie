import React from 'react';
import Login from '../containers/login';

const Auth = ({currentCustomer, children}) => (
  <div>
    {currentCustomer && children}
    {!currentCustomer && <Login />}
  </div>
);

export default Auth;
