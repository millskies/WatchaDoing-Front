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
      <hr></hr>
      <div className="own-profile">
      <div className="left-row">
      <div className="header image-container">
        <img src={currentUser.picture}/>
        <Link to={`/${username}/edit`}>Edit Profile</Link>
        <div className="friends">
      <Friends userData={currentUser} />
      </div>
      </div>
      </div>

      <div className="my-events">
      {!loadingUserInfo && <MyEvents events={currentUser.eventsCreated} />}
      </div>
      </div>
    </div>
  );
}
