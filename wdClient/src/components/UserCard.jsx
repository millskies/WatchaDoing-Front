import { useContext } from "react";
import axios from "axios";
import { authContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";

function UserCard({ person, updatePeople }) {
  const { isLoggedIn, user, baseUrl } = useContext(AuthContext);
  const { _id, username, profileImage } = person;

  const friendRequestHandler = () => {
    axios.post(baseUrl + "/:friendId/sendrequest")
    .then((resp) => {
      updatePeople(Math.random() * 1000, username);
    });
  };

  return (
    <div className="userCard">
      <Link to={"/users/" + username}>
        <img className="imgUserAddF profilePic" src={profileImage} alt={name} />
      </Link>
      <div className="userInfo">
        <h5 className="username">{username}</h5>
      </div>
      <div className="RequestButton">
        <button
          className="btn btn-primary rqButt"
          onClick={friendRequestHandler}
        >
          Send Friend Request
        </button>
      </div>
    </div>
  );
}

export default UserCard;