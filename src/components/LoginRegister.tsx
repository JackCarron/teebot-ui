import React from 'react';
import './LoginRegister.css';

const LoginRegister: React.FC = () => {
  return (
    <><div>
          <h1>Teebot Sign Up/In</h1>
      </div><div className="LoginRegister">
              <div className="LeftPane">
                  <h2>Register</h2>
                  <p>Create a new account to get started.</p>
                  <a className="cta-button" href="/#/register">Register</a>
              </div>
              <div className="RightPane">
                  <h2>Login</h2>
                  <p>Already have an account? Login here.</p>
                  <a className="cta-button" href="/#/login">Login</a>
              </div>
          </div></>
  );
}

export default LoginRegister;
