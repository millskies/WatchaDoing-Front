import axios from "axios";
import { authContext } from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import OwnProfilePage from "./OwnProfilePage";
import PublicProfilePage from "./PublicProfilePage";

export default function ProfilePage() {
  const { user, baseUrl } = useContext(authContext);
  console.log("useeer:",user)
  const { username } = useParams();
  console.log("username: ", username)
  const navigate = useNavigate();

  const [ownProfile, setOwnProfile] = useState(false); // changeLater
  const [publicProfile, setPublicProfile] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      if (username == user.username) {
        console.log("useeertimeout:",user)
        setOwnProfile(true);
        setPublicProfile(false);
      } else if (username != user.username) {
        axios
          .get(baseUrl + "/users/" + username)
          .then((response) => {
            console.log("response: ", response);
            setPublicProfile(true);
            setOwnProfile(false);
          })
          .catch((err) => {
            console.log(err);
            navigate("/404");
          });
      }
    // console.log("params: ", params)
    
  }, [username]);

  // Check if the username profile route we are trying to access belongs to a real user or should redirect to an error page.

  //Uncomment this part below when we have auth system correctly set up. //changeLater

  // useEffect(() => {
  //   if (user && username != user.username) {
  //     axios
  //       .get(baseUrl + "/users/" + username)
  //       .then(setPublicProfile(true);
  //       setOwnProfile(false))
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
    blabla
      {/* {ownProfile && (
        <div>
          <OwnProfilePage />
        </div>
      )}

      {publicProfile && (
        <div>
          <PublicProfilePage />
        </div>
      )} */}
    </div>
  );
}
