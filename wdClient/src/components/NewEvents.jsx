import axios from "axios";
import "../css/DashboardPage.css";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function NewEvents() {
  const [loadingNewEvents, setLoadingNewEvents] = useState(true);
  const [newEvents, setNewEvents] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [joinedEvents, setJoinedEvents] = useState([]);
  const { isLoggedIn, user, loading, baseUrl, getHeaders } = useContext(authContext);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(()=>{
    axios.get(baseUrl + "/users/" + user.username)
    .then(({data}) => {
      setCurrentUser(data);
      setNewEvents(data.eventsPending)
      setLoadingNewEvents(false)
    })
    .then(()=>{
      console.log("newEvents:", newEvents)
    })
    .catch((err) => {
      console.log(err);
    });
  },[loading])


//------------- FUNCTIONS FOR BUTTONS --------------------
  const joinEvent = (eventId)=>{
    console.log("********fdf*****", eventId)
    axios.post(baseUrl + "/events/" + eventId + "/accept", {}, getHeaders())
    .then(({data}) => {
      setJoinedEvents(prevJoinedEvents => [...prevJoinedEvents, eventId])
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const unJoinEvent = (eventId)=>{
    axios.post(baseUrl + "/events/" + eventId + "/unjoin", {}, getHeaders())
    .then(({data}) => {
      setJoinedEvents(prevJoinedEvents => prevJoinedEvents.filter(id => id !== eventId));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const rejectEvent = (eventId)=>{
    axios.post(baseUrl + "/events/" + eventId + "/reject", {}, getHeaders())
    .then(({data}) => {
      let newArray = [...newEvents]
      setNewEvents(newArray.filter(event => event._id !== eventId))
      setUpdateTrigger(!updateTrigger);
    })
    .catch((err) => {
      console.log(err);
    });
  }

//-------------------------- RETURN ------------------------------
  return (
    <div className="NewEvents">
    
    {/* {loadingNewEvents && <p className="fa-solid fa-lemon fa-shake"></p>} */}
    
    {!loadingNewEvents && newEvents.length == 0 && <p>No events yet</p>}

    {newEvents && newEvents.map((event, k) => <div className='new-event' key={event._id, k}>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
        <p>{event.location}</p>
        <p>{ new Date(event.dateTime).toLocaleString()}</p>

        {/* ------- Button to either join or unjoin ---------- */}
        <Link to={`/events/${event._id}`}>More details</Link>
        {joinedEvents.includes(event._id) ? <button type="button" className="unjoin" onClick={ () => unJoinEvent(event._id)}>Unjoin</button> : <> <button type="button" className="btn join" onClick={ () => joinEvent(event._id)}>Join</button>
        <button type="button" className="reject" onClick={() => rejectEvent(event._id)}>Reject</button>
        <hr className="newevents"></hr></>}

        {/* ----- Button to reject event and make it disappear from the list ------- */}
        
      </div>)}

    </div> 
  )
}
