import "../css/DashboardPage.css"
import { authContext } from "../contexts/auth.context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";
import ConfirmedEvents from "../components/ConfirmedEvents";
import NewEvents from "../components/NewEvents";

export default function DashboardPage() {
  const { isLoggedIn, user, loading } = useContext(authContext);

  return (
    <>
      <Navbar />
      <header>
      <p>Welcome, {user ? user.username : "anon"}</p> {/* changeLater */}
      {!user && <Link to={"/anon"}>Go to profile page</Link>} {/* changeLater */}
      {user && <Link to={`/${user.username}`}>Go to your profile page</Link>}
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
