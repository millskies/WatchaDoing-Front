import { useParams, Link, Outlet } from "react-router-dom";

export default function Friends() {
  const { username } = useParams();
  return (
    <div id="Friends">
      <h4>
        <span>Friends </span>
        <Link to={`/${username}/friends`}>(Show all)</Link>
      </h4>
     
    </div>
  );
}
