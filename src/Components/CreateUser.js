// src/components/CreateUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();
  // State variables for form fields
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState(null);

  // Function to handle form submission
  const createUser = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      await response.json();
      navigate('/');
    } catch (error) {
      setError('Failed to create user.');
    }
  };

  // Render form
  return (
    <div className="container">
      <h2>Create New User</h2>
      {error && <p>{error}</p>}
      <form onSubmit={createUser}>
        <label>Name:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <label>Phone:</label>
        <input
          type="text"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          required
        />
        <button type="submit" className="button">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
