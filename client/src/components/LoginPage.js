import React from 'react';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';
import './LoginPage.css'

function LoginPage() {
  return (
    <div className="loginPage">
      <LoginButton />
      <SignUpButton />
    </div>
  );
}

export default LoginPage;
