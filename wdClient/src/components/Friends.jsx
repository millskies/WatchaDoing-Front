import { useState } from "react";
import InviteList from "./InviteList";
import FriendsOverview from "./FriendsOverview";
import FriendsAll from "./FriendsAll";
import FriendsPending from "./FriendsPending";

//This component manages the profile components of: on one hand FriendsLists and on the other hand FriendsOverview and FriendsAll.

export default function Friends({userData}) {
  const [showFriendsLists, setShowFriendsLists] = useState(false);
  const [showFriendsOverview, setShowFriendsOverview] = useState(true);
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [showFriendsPending, setShowFriendsPending] = useState(false);

  function toggleFriendsLists() {
    showFriendsLists ? setShowFriendsLists(false) : setShowFriendsLists(true);
  }
  function toggleFriendsOverview() {
    if (showFriendsOverview) {
      console.log("userdata:", userData)
      setShowFriendsOverview(false);
      setShowAllFriends(true);
      setShowFriendsPending(false);
    } else {
      setShowFriendsOverview(true);
      setShowAllFriends(false);
      setShowFriendsPending(false);
    }
  }
  function toggleFriendsPending() {
    if (showFriendsPending) {
      setShowFriendsPending(false);
      setShowAllFriends(true);
    } else {
      setShowFriendsPending(true);
      setShowAllFriends(false);
    }
  }

  return (
    <div id="Friends" className="leftRow">
    <div className="friends-buttons">
      <button className="friends" onClick={() => toggleFriendsLists()}>
        Friends Circles
      </button>
      {/* changeLater. What is the definitive name we want for the inviteLists/friendsLists/inviteGroups..? */}
      <div>{showFriendsLists && <InviteList />}</div>
      <div className="rowFlex space-between">
        <p>
          {/* {showFriendsOverview && "Friends"}
          {showAllFriends && "All Your Friends"} */}
          {showFriendsPending && "Friendship Requests"}
        </p>
        <button className="all-friends" onClick={() => toggleFriendsOverview()}>
          {showFriendsOverview ? "Show All Friends" : "Back to abridged view"}
        </button>
      </div>
      {showFriendsOverview && <FriendsOverview />}
      </div>
      <div>
      {showAllFriends && (
        <div>
          <FriendsAll />
          <button className="all-friends" onClick={() => toggleFriendsPending()}>
            See friendship requests
          </button>
        </div>
      )}
      {showFriendsPending && (
        <div>
          <FriendsPending userData={userData} />
          <button className="current-friends" onClick={() => toggleFriendsPending()}>
            See current friends
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
