import axios from "axios";
import { authContext } from "../contexts/auth.context";
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
            <img src={friendRequest.picture} alt={friendRequest.username} />
            {friendRequest.username}
            <button onClick={() => acceptFriend(friendRequest._id)} type="submit" className="btn btn-success">
              Accept
            </button>
          </div>
        );
      })}
      {!userData.friendsPending[0] && <p>You have no new friendship requests</p>}
    </div>
  );
}
