import axios from "axios";
import "../css/DashboardPage.css";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function NewEvents() {
  const [loadingNewEvents, setLoadingNewEvents] = useState(true);
  const [newEvents, setNewEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [joinedEvents, setJoinedEvents] = useState([]);
  const { isLoggedIn, user, loading, baseUrl, getHeaders } = useContext(authContext);
  const [updateTrigger, setUpdateTrigger] = useState(false);

useEffect(()=>{
  // console.log('---LOCATION--------', newEvents[0].creator)
  console.log('-----------NewEvents:', newEvents)
}, [newEvents])

  useEffect(()=>{
    axios.get(baseUrl + "/users/" + user.username)
    .then(({data}) => {
      setCurrentUser(data);
      setNewEvents(data.eventsPending)
      setLoadingNewEvents(false)
      console.log('&&&&&&&&data.eventsPending', data.eventsPending)
    })
    .catch((err) => {
      console.log(err);
    });
  },[loading])


//------------- FUNCTIONS FOR BUTTONS --------------------
  const joinEvent = (eventId)=>{
    console.log("*************", eventId)
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
    <h3>New events</h3>
    {/* {loadingNewEvents && <p className="fa-solid fa-lemon fa-shake"></p>} */}
    
    {!loading && newEvents.length == 0 && <p>No events yet</p>}

    {!loading && newEvents.map(event => <div className='new-event' key={event._id}>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
        <p>{event.location}</p>
        <p>{ new Date(event.dateTime).toLocaleString()}</p>

        {/* ------- Button to either join or unjoin ---------- */}
        <Link to={`/events/${event._id}`}>More details</Link>
        {joinedEvents.includes(event._id) ? <button type="button" className="btn btn-primary" onClick={ () => unJoinEvent(event._id)}>Unjoin</button> : <> <button type="button" className="btn btn-primary" onClick={ () => joinEvent(event._id)}>Join</button>
        <button type="button" className="btn btn-danger" onClick={() => rejectEvent(event._id)}>Delete for me</button></>}

        {/* ----- Button to reject event and make it disappear from the list ------- */}
        
      </div>)}

    </div> 
  )
}
