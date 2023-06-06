import "../../css/OwnProfile.css";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Friends from "../../components/Friends";
import MyEvents from "../../components/MyEvents";

export default function OwnProfilePage() {
  const { username } = useParams();
  console.log("username: ",username)

  return (
    <div id="OwnProfile">
      <Navbar />
      <div className="header">
        <h3 id="welcome">Welcome, {username}!</h3>
        <Link to={`/${username}/edit`}>Edit Profile</Link>
      </div>
      <Friends />
      <MyEvents />
    </div>
  );
}
