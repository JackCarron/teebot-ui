import { Auth } from 'aws-amplify';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { ContactPreference, User } from '../types/User';

function CreateUser() {
  const history = useHistory();  
  // Set up state for the user object
  const [user, setUser] = useState<User>({
    userId: '',
    contactPreference: ContactPreference.EMAIL,
    email: '',
    password: '',
    otp: ''
  });

  // Handle input changes and update the user object
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const signUpResponse = await Auth.signUp({
        username: user.userId,
        password: user.password,
        attributes: {
          email: user.email
        },
      });
      console.log(signUpResponse);
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const submitOtp = () => {
    const otpResponse = Auth.confirmSignUp(user.userId, user.otp ?? '');
    history.push('/login')
    console.log(otpResponse);
  
  } 

  // Render a form for creating a new user
  return (
    <><><form onSubmit={handleSubmit}>
      <label>
        UserId:
        <input type="userId" name="userId" value={user.userId} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={user.password} onChange={handleChange} />
      </label>
      <button type="submit">Create User</button>
    </form>
      <label>
        OTP:
        <input type="otp" name="otp" value={user.otp} onChange={handleChange} />
      </label></><button onClick={submitOtp}>Submit OTP</button></>
  );
}

export default CreateUser;
