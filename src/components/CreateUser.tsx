import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ContactPreference, User } from '../types/User';


function CreateUser() {
  // Set up state for the user object
  const [user, setUser] = useState<User>({
    userId: '',
    contactPreference: ContactPreference.EMAIL,
    email: '',
    password: ''
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
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Render a form for creating a new user
  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default CreateUser;
