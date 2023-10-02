import { Auth } from 'aws-amplify';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { ContactPreference, User } from '../types/User';
import './createuser.css';
import './styles.css';

function CreateUser() {
  const history = useHistory();
  const [user, setUser] = useState<User>({
    userId: '',
    contactPreference: ContactPreference.EMAIL,
    email: '',
    password: '',
    otp: ''
  });
  const [showOTP, setShowOTP] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowOTP(true);
    try {
      const signUpResponse = await Auth.signUp({
        username: user.userId,
        password: user.password,
        attributes: {
          email: user.email
        },
      });
      console.log(signUpResponse);
    } catch (error) {
      console.error(error);
    }
  }

  const submitOtp = () => {
    const otpResponse = Auth.confirmSignUp(user.userId, user.otp ?? '');
    history.push('/login');
    console.log(otpResponse);
  }

  return (
    <div className="CreateUser">
      <h3>Create Account</h3>
      <form className="CreateUser-form" onSubmit={handleSubmit}>
          <label>
            UserId:
            <input type="text" name="userId" value={user.userId} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={user.password} onChange={handleChange} />
          </label>
        {showOTP ?
          <><label>
            OTP:
            <input type="text" name="otp" value={user.otp} onChange={handleChange} />
          </label><button className="CreateUser-otpButton" onClick={submitOtp}>Submit OTP</button></>
         : undefined}
        
        {!showOTP ? <button type="submit">Create User</button> : undefined}
      </form>
    </div>
  );
}

export default CreateUser;
