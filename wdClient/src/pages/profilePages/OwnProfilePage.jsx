import axios from "axios";
import "../../css/OwnProfile.css";
import { authContext } from "../../contexts/auth.context";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Friends from "../../components/Friends";
import MyEvents from "../../components/MyEvents";

export default function OwnProfilePage() {
  const { username } = useParams();
  const { user, baseUrl, loading } = useContext(authContext);

  // Retrieve current user data (so that we can pass the info we want to the corresponding components)
  useEffect(()=>{
    axios
          .get(baseUrl + "/users/" + username)
          .then(({data}) => {
            console.log("response userrr: ", data);
          })
          .catch((err) => {
            console.log(err)
          });
  }, [loading])


  return (
    <div id="OwnProfile">
      <Navbar />
      <div className="header">
        <h3 id="welcome">Welcome, {username}!</h3>
        <Link to={`/${username}/edit`}>Edit Profile</Link>
      </div>
      <Friends />
      <MyEvents events={user.eventsCreated}/>
    </div>
  );
}
