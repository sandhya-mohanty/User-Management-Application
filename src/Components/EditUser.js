import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  // State variables
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, [id]);

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      setUser({ name: data.name, email: data.email, phone: data.phone });
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user.');
    }
  };

  // Function to handle form submission
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      await response.json();
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };

  // Render form
  return (
    <div className="container">
      <h2>Edit User</h2>
      {error && <p>{error}</p>}
      <form onSubmit={updateUser}>
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
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
