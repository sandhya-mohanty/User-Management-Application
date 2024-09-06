// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserList from './CreateUseromponents/UserList';
// import CreateUser from './components/CreateUser';
// import EditUser from './components/EditUser';
// import UserDetail from './components/UserDetail';
import './App.css';
import UserList from './Components/UserList';
import CreateUser from './Components/CreateUser';
import EditUser from './Components/EditUser';
import UserDetail from './Components/UserDetail';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation or Header can be added here */}
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
