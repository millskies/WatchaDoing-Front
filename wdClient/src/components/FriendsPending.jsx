import axios from "axios";
import { authContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function FriendsPending({ userData }) {
  const { user, baseUrl, loading, getHeaders, getUserInfo } = useContext(authContext);

  function acceptFriend(friendId) {
    axios
      .post(baseUrl + "/friendstatus/" + friendId + "/" + "accept", {}, getHeaders())
      .then((resp) => {
        getUserInfo();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="FriendsPending">
      {userData.friendsPending.map((friendRequest) => {
        return (
          <div key={friendRequest._id}>
            <div className="rowFlex">
              <img src={friendRequest.picture} alt={friendRequest.username} />
              <Link onClick={() => {window.location.href=`/${friendRequest.username}`}}> {friendRequest.username} </Link>
              <button onClick={() => acceptFriend(friendRequest._id)} type="submit" className="btn btn-success">
                Accept
              </button>
            </div>
          </div>
        );
      })}
      {!userData.friendsPending[0] && <p>You have no new friendship requests</p>}
    </div>
  );
}
