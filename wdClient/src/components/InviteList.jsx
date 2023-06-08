import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateInviteList from "./CreateInviteList";

export default function InviteList() {
  const { currentUser, baseUrl } = useContext(authContext);

  const [showCreateList, setShowCreateList] = useState(false);
  function toggleCreateList() {
    showCreateList ? setShowCreateList(false) : setShowCreateList(true);
  }

  return (
    <div id="InviteList">
      <button
        className="btn btn-outline-primary"
        onClick={(e) => {
          e.preventDefault();
          toggleCreateList();
        }}
      >
        {!showCreateList ? <img style={{ width: "20px" }} src="plus.png" alt="create event" /> : <img style={{ width: "20px" }} src="minus.png" alt="roll up create event" />}
      </button>
      {showCreateList && <CreateInviteList />}
      {currentUser.inviteLists[0] ? <div className="lists">
        {currentUser.inviteLists.map((list)=>{
            return <div className="list" key={list._id}>
            <h5>{list.title}</h5> <div className="inviteUsers">{list.users.map((user)=>{
                return (
                    <div className="inviteUser" key={user._id}>
                    <img className="friendIcon" src={user.picture} alt={user.username} />
                    <a href={`/${user.username}`}> {user.username} </a>
                    </div>
                )
            })}
            </div>
            </div>
        })}
      </div> : "No Friend Circles to show"}
    </div>
  );
}
