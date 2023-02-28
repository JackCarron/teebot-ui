import React, { useState, FormEvent } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log(`Submitting with username: ${username} and password: ${password}`);
    try {
      const signInResponse = await Auth.signIn(username, password);
      if (signInResponse.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // SET NEW PASSWORD
        // const newPassword = await Auth.completeNewPassword(signInResponse, "password");
      }
      // TODO: Put user in context
      history.push("/time-selector");
    } catch (ex) {
      console.log(ex);
      alert('Sign In Fail, Try again')
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
