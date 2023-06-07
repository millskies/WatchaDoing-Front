import axios from "axios";
import "../../css/OwnProfile.css";
import { authContext } from "../../contexts/auth.context";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Friends from "../../components/Friends";
import MyEvents from "../../components/MyEvents";

export default function OwnProfilePage() {
  const { username } = useParams();
  const { user, baseUrl, loading, getUserInfo, currentUser, loadingUserInfo } = useContext(authContext);

  // Retrieve current user data at mounting phase.
  useEffect(()=>{
    getUserInfo()
  }, [loading])


  return (
    <div id="OwnProfile">
      <Navbar />
      <div className="header">
        <h3 id="welcome">Welcome, {username}!</h3>
        <Link to={`/${username}/edit`}>Edit Profile</Link>
      </div>
      <Friends userData={currentUser}/>
      {!loadingUserInfo && <MyEvents events={currentUser.eventsCreated}/>}
    </div>
  );
}
