import React from 'react';
import {auth } from './firebase'; // Make sure the path to your firebase config file is correct

import { useLocation } from 'react-router-dom';
import "./styles.css"


const Profile = () => {


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const displayName = queryParams.get('displayName');
  const email = queryParams.get('email');

  const userString = localStorage.getItem('user');
  let cacheDatat = JSON.parse(userString)
  



  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }





  return (
    <div>
      <h1>User Data</h1>
      <h3>{cacheDatat.displayName}</h3>
      <h3>{ cacheDatat.email}</h3>

      <button onClick={handleLogout}>Logout</button>
      
    </div>

  );
};

export default Profile;