import axios from "axios";
import { authContext } from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function PublicProfilePage() {
  const { baseUrl, getHeaders, currentUserRaw, getUserInfoRaw, loadingRaw } = useContext(authContext);
  const { username } = useParams();

  const [publicUserRaw, setPublicUserRaw] = useState({});
  const [loadingPublicUser, setLoadingPublicUser] = useState(true);
  const [friendshipStatus, setFriendshipStatus] = useState("");
 

  

  function getPublicUserDataRaw() {
    axios
      .get(baseUrl + "/users/" + username + "/raw")
      .then(({ data }) => {
        setPublicUserRaw(data);
        setLoadingPublicUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPublicUserDataRaw();
    getUserInfoRaw();
  }, []);

  useEffect(() => {
    if (loadingRaw) return;
    if (loadingPublicUser) return;

    if (!currentUserRaw.friendsPending.includes(publicUserRaw._id) && !publicUserRaw.friendsPending.includes(currentUserRaw._id) && !currentUserRaw.friendsConfirmed.includes(publicUserRaw._id)) setFriendshipStatus("TOSEND");
    else if (currentUserRaw.friendsPending.includes(publicUserRaw._id)) setFriendshipStatus("TOACCEPT");
    else if (publicUserRaw.friendsPending.includes(currentUserRaw._id)) setFriendshipStatus("REQUESTED");
    else if (currentUserRaw.friendsConfirmed.includes(publicUserRaw._id)) setFriendshipStatus("TOREVOKE");
  }, [currentUserRaw, publicUserRaw]);

  function addFriend() {
    axios
      .post(baseUrl + "/friendstatus/" + publicUserRaw._id + "/sendrequest", {}, getHeaders())
      .then(({ data }) => {
        getPublicUserDataRaw();
      })
      .catch((err) => {
        console.log(err);
        // set error message alarm?
      });
  }

  function removeFriend() {
    axios
      .post(baseUrl + "/friendstatus/" + publicUserRaw._id + "/remove", {}, getHeaders())
      .then(({ data }) => {
        getPublicUserDataRaw();
        getUserInfoRaw();
      })
      .catch((err) => {
        console.log(err);
        // set error message alarm?
      });
  }

  function acceptFriend() {
    axios
      .post(baseUrl + "/friendstatus/" + publicUserRaw._id + "/" + "accept", {}, getHeaders())
      .then((resp) => {
        getUserInfoRaw();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar />
      <h4>Public Profile Page of {username}</h4>

      {friendshipStatus == "TOSEND" && (
        <button
          onClick={() => {
            addFriend();
          }}
          type="button"
          className="btn btn-primary"
        >
          Send friendship request
        </button>
      )}
      {friendshipStatus == "TOACCEPT" && (
        <button
          onClick={() => {
            acceptFriend();
          }}
          type="button"
          className="btn btn-success"
        >
          Accept friend request
        </button>
      )}
      {friendshipStatus == "REQUESTED" && (
        <button disabled className="btn btn-secondary">
          Friendship requested
        </button>
      )}
      {friendshipStatus == "TOREVOKE" && (
        <button
          onClick={() => {
            removeFriend();
          }}
          className="btn btn-warning"
        >
          Revoke friendship
        </button>
      )}
    </div>
  );
}
