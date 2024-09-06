// src/components/UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  // State variables
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, [id]);

  // Function to fetch user data
  const fetchUser = async () => {
    setLoading(true);
    try {
      let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      setUser(data);
    } catch (error) {
      setError('Failed to fetch user.');
    } finally {
      setLoading(false);
    }
  };

  // Render loading spinner or error message
  if (loading) return <div className="spinner"></div>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user found.</p>;

  // Render user details
  return (
    <div className="container">
      <h2>User Details</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      {/* Additional details can be added here */}
    </div>
  );
}

export default UserDetail;
