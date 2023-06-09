import axios from "axios";
import { authContext } from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OwnProfilePage from "./OwnProfilePage";
import PublicProfilePage from "./PublicProfilePage";

export default function ProfilePage() {
  const { user, baseUrl, loading } = useContext(authContext);
  // console.log("useeer:",user)
  const { username } = useParams();
  // console.log("username: ", username)
  const navigate = useNavigate();

  const [publicUserData, setPublicUserData] = useState({});

  useEffect(() => {
    if (loading) return;
      if (username != user.username) { // Check if the username profile route we are trying to access belongs to a real user or should redirect to an error page.
        axios
          .get(baseUrl + "/users/" + username)
          .then(({data}) => {
            console.log("response: ", data);
            setPublicUserData(data);
          })
          .catch((err) => {
            console.log(err);
            navigate("/404");
          });
      }
    // console.log("params: ", params)
    
  }, [loading]);

  return (
    <div>
      {!loading && (username == user.username) && (
        <div>
          <OwnProfilePage />
        </div>
      )}

      {!loading && (username != user.username) && publicUserData.username && (
        <div>
          <PublicProfilePage publicUserData={publicUserData}  />
        </div>
      )}
    </div>
  );
}
