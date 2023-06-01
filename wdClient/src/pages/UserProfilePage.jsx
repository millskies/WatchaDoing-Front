import axios from "axios";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function UserProfilePage() {
  const { username } = useParams();
  // console.log("username: ", username)
  const { user, baseUrl } = useContext(authContext);
  const navigate = useNavigate();

  const [ownProfile, setOwnProfile] = useState(false);
  const [externalProfile, setExternalProfile] = useState(false);

  if (user && username == user.username) {
    setOwnProfile(true);
  }

  // Check if the username profile route we are trying to access belongs to a real user or should redirect to an error page.
  useEffect(() => {
    if (user && username != user.username) {
      axios
        .get(baseUrl + "users/" + username)
        .then(setExternalProfile(true))
        .catch((err) => {
          console.log(err);
          navigate("/404");
        });
    } else if (!user) {
      navigate("/404");
    }
  }, []);

  return (
    <div>
      <div>UserProfilePage</div>
      {ownProfile && <div>OWN ProfilePage !</div>}

      {externalProfile && <div>EXTERNAL ProfilePage !</div>}
    </div>
  );
}
