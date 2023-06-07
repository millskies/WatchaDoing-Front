import axios from "axios";
import "../css/DashboardPage.css";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";
import ConfirmedEvents from "../components/ConfirmedEvents";
import NewEvents from "../components/NewEvents";

export default function DashboardPage() {
  const [loadingDashboard, setLoadingDashboard] = useState(true)
  const [currentUser, setCurrentUser] = useState({}) //info of current user, populated on the backend route
  const { isLoggedIn, user, loading, baseUrl } = useContext(authContext);

  useEffect(()=>{
    console.log("user", user)
    axios.get(baseUrl + "/users/" + user.username)
    .then(({data}) => {
      setCurrentUser(data);
      // setLoadingDashboard(false)
    })
    .catch((err) => {
      console.log(err);
    });
  },[loading])

  return (
    <>
      <Navbar />
      <header>
      <img id="profilePicture" src={currentUser.picture} alt="profile picture"></img>
        <p>Welcome, {user ? user.username : "anon"}!</p>
        {/* {user && <Link to={`/${user.username}`}>Go to your profile page</Link>}
        {user && <Link to="/Testuser">Go to Testuser page</Link>} */}
      </header>
      <div className="dashboardComponents">
        <div className="row1">
          <Calendar />
          <ConfirmedEvents />
        </div>
        <div className="row2">
          <NewEvents />
        </div>
      </div>
    </>
  );
}
