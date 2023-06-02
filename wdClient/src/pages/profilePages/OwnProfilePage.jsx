import "../../css/OwnProfile.css"
import { useParams, Link, Outlet } from 'react-router-dom'
import Navbar from "../../components/Navbar";
import Friends from "../../components/Friends"

export default function OwnProfilePage() {
    const { username } = useParams();

  return (
    <div id="OwnProfile">
    <Navbar/>    
    <div>OwnProfilePage</div>
    <Link to={`/${username}/edit`}>Edit Profile!</Link>
    <div className="components">
    <Link to={`/${username}/friendslists`}>FriendsLists!</Link>
    {/* <Outlet/> */}
    <Friends/>
    </div>
    </div>
  )
}
