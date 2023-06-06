import axios from "axios";
import { authContext } from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function PublicProfilePage({publicUserName, publicUserId, publicUserFriendsPending}) {
  const { loading, user, baseUrl, getHeaders } = useContext(authContext);

  const [alreadyFriends, setAlreadyFriends] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (publicUserFriendsPending.includes(user.userId)) {
      setAlreadyFriends(true)
    } 
  }, [loading]);

  function addFriend() {
    axios.post(baseUrl + "/friendstatus/" + publicUserId + "/sendrequest", {}, getHeaders())
        .then(({data})=>{
            console.log("friendship request outcome: ", data)
            setAlreadyFriends(true)
        })
        .catch((err) => {
            console.log(err)
            // set error message alarm?
          });
  }




  return (
    <div>
      <Navbar />
      <h4>Public Profile Page of {publicUserName}</h4>

      {!alreadyFriends && <button onClick={()=>{addFriend()}} type="button" className="btn btn-primary">
        Add friend
      </button>}
      {alreadyFriends && <button disabled className="btn btn-secondary">
        Friendship requested
      </button>}
    </div>
  );
}
