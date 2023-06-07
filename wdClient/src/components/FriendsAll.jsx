import { Link } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";

export default function FriendsAll() {
  const { loadingUserInfo, user, currentUser, baseUrl, getHeaders, getUserInfo } = useContext(authContext);

  return (
    <div id="FriendsAll" >
      {!loadingUserInfo &&
        currentUser.friendsConfirmed.map((friend) => {
          return (
            <div className="friend" key={friend._id}>
              <img className="friendIcon" src={friend.picture} alt={friend.username} />
              <Link to={`/${friend.username}`}> {friend.username} </Link>
            </div>
          );
        })}
    </div>
  );
}
