import axios from "axios";
import { authContext } from "../../contexts/auth.context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function PublicProfilePage() {
  const { username } = useParams();
  const otherUser = username;
  const { user, baseUrl } = useContext(authContext);
  const currentUser = user;
  

  function addFriend() {
    let token = localStorage.getItem('authToken');
    console.log("token: ", token)
    axios.post(baseUrl + "/friendstatus" + "/6479ff1dc2ff688d4a41f2c5" + "/sendrequest", {}, {headers: {authorization: `Bearer ${token}`}}) /* I'm here testing stuff, trying to see if this workssss */
        .then(({data})=>{
            console.log("useeeer####: ", data)
        })
        .catch((err) => {
            console.log(err)
            // set error message alarm?
          });
  }




  return (
    <div>
      <Navbar />
      <h4>Public Profile Page of {otherUser}</h4>

      <button onClick={()=>{addFriend()}} type="button" className="btn btn-link">
        Add friend
      </button>
    </div>
  );
}
