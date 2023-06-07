import axios from "axios";
import { authContext } from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function PublicProfilePage({publicUserData}) {
  const { loading, loadingUserInfo, user, currentUser, baseUrl, getHeaders, currentUserRaw, getUserInfo } = useContext(authContext);
  const { username } = useParams();

  const [publicUserRaw, setPublicUserRaw] = useState({})
  const [loadingUserData, setloadingUserData] = useState(true);

  const [alreadyFriends, setAlreadyFriends] = useState(false);
  const [theyRequested, setTheyRequested] = useState(false);
  const [youRequested, setYouRequested] = useState(false);


  function getPublicUserDataRaw() {
    axios
          .get(baseUrl + "/users/" + username + "/raw")
          .then(({data}) => {
            setPublicUserRaw(data);
            setloadingUserData(false)
            console.log("own rawww", loadingUserInfo, currentUserRaw)
          })
          .catch((err) => {
            console.log(err);
          });
  }

  useEffect(()=>{getPublicUserDataRaw()}, [])


  function refreshFriendshipStatus() {
    if (loading) return;
    if (loadingUserData) return;
    if (publicUserRaw.friendsConfirmed.includes(user.userId)) {
      setAlreadyFriends(true)
      return};
    if (publicUserRaw.friendsPending.includes(user.userId)) {
      setYouRequested(true) 
    } 
    if (currentUserRaw.friendsPending.includes(publicUserRaw._id)) {
      setTheyRequested(true)
    }
  }

  useEffect(() => {
    console.log("kkkkkkk",publicUserRaw)
    refreshFriendshipStatus();
    console.log(theyRequested)
  }, [loadingUserInfo]);

  function addFriend() {
    axios.post(baseUrl + "/friendstatus/" + publicUserRaw._id + "/sendrequest", {}, getHeaders())
        .then(({data})=>{
            console.log("friendship request outcome: ", data)
            setTheyRequested(true)
            refreshFriendshipStatus()
        })
        .catch((err) => {
            console.log(err)
            // set error message alarm?
          });
  }

  function removeFriend() {
    axios.post(baseUrl + "/friendstatus/" + publicUserRaw._id + "/remove", {}, getHeaders())
    .then(({data})=>{
        console.log("friendship revoke outcome: ", data)
        setTheyRequested(true)
        refreshFriendshipStatus()
    })
    .catch((err) => {
        console.log(err)
        // set error message alarm?
      });
  }

  function acceptFriend(friendId) {
    axios
      .post(baseUrl + "/friendstatus/" + friendId + "/" + "accept", {}, getHeaders())
      .then((resp) => {
        getUserInfo();
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <Navbar />
      <h4>Public Profile Page of {username}</h4>

      {!theyRequested && !youRequested && !alreadyFriends && <button onClick={()=>{addFriend()}} type="button" className="btn btn-primary">
        Send friendship request
      </button>}
      {theyRequested && <button onClick={()=>{acceptFriend()}} type="button" className="btn btn-success">
        Accept friend request
      </button>}
      {youRequested && !alreadyFriends && <button disabled className="btn btn-secondary">
        Friendship requested
      </button>}
      {alreadyFriends && <button onClick={()=>{removeFriend()}} className="btn btn-warning">
        Revoke friendship
      </button>}
    </div>
  );
}
