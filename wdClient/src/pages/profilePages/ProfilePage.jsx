import axios from "axios";
import { authContext } from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import OwnProfilePage from "./OwnProfilePage";
import PublicProfilePage from "./PublicProfilePage";

export default function ProfilePage() {
  const { username } = useParams();
  // console.log("username: ", username)
  const { user, baseUrl } = useContext(authContext);
  const navigate = useNavigate();

  const [ownProfile, setOwnProfile] = useState(true); // changeLater
  const [publicProfile, setPublicProfile] = useState(false);

  if (user && username == user.username) {
    setOwnProfile(true);
  }

  // Check if the username profile route we are trying to access belongs to a real user or should redirect to an error page.

  //Uncomment this part below when we have auth system correctly set up. //changeLater

  // useEffect(() => {
  //   if (user && username != user.username) {
  //     axios
  //       .get(baseUrl + "users/" + username)
  //       .then(setPublicProfile(true))
  //       .catch((err) => {
  //         console.log(err);
  //         navigate("/404");
  //       });
  //   } else if (!user) {
  //     navigate("/404");
  //   }
  // }, []);

  return (
    <div>
      {ownProfile && (
        <div>
          <OwnProfilePage />
        </div>
      )}
      
      {publicProfile && (
        <div>
          <PublicProfilePage />
        </div>
      )}
    </div>
  );
}
