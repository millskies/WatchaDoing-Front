// import axios from "axios";
// import { authContext } from '../contexts/auth.context';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import CreateInviteList from "./CreateInviteList";

export default function InviteList() {
    const [showCreateList, setShowCreateList] = useState(false);
    const [userData, setUserData] = useState({})

    const navigate = useNavigate();
    const {username} = useParams()

    // const {baseUrl} = useContext(authContext);

    // useEffect(()=>{
    //     console.log("username:",username)
    //     axios.get(baseUrl + "/users/" + username)
    //     .then(({data})=>{
    //         setUserData(data)
    //         console.log("useeeer####: ", data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         // set error message alarm?
    //       });
    // }, [])


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
      {showCreateList && <CreateInviteList/>}
      <div>
        {}
      </div>
    </div>
  )
}
