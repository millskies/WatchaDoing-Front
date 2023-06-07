import axios from "axios";
import "../css/DashboardPage.css";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function NewEvents() {

  const [loadingNewEvents, setLoadingNewEvents] = useState(true)
  const [newEvents, setNewEvents] = useState('');
  const [currentUser, setCurrentUser] = useState({})
  const { isLoggedIn, user, loading, baseUrl } = useContext(authContext);

  useEffect(()=>{
    axios.get(baseUrl + "/users/" + user.username)
    .then(({data}) => {
      setCurrentUser(data);
      setNewEvents(data.eventsPending)
      setLoadingNewEvents(false)
      console.log('&&&&&&&&', data.eventsPending)
    })
    .catch((err) => {
      console.log(err);
    });
  },[loading])


  return (
    <div className="NewEvents">
    <h3>New events</h3>
    {/* {loadingNewEvents && <p className="fa-solid fa-lemon fa-shake"></p>} */}
    
    {!loading && newEvents.length == 0 && <p>No events yet</p>}

    {!loading && newEvents && newEvents.map(event => <div className='new-event' key={event._id}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <Link to={`/events/${event._id}`}>More details</Link>
        <button type="button" className="btn btn-primary" onClick={joinEvent}>Join</button>
      </div>)}
    </div> 
  )
}
