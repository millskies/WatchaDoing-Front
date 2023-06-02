import { useParams, Link, Outlet } from "react-router-dom";

export default function FriendsOverview() {
  const { username } = useParams();
  return (
    <div id="FriendsOverview">
      <p>FriendsOverview</p>
      <Link to={`/${username}`}>Close</Link>
    </div>
  );
}
