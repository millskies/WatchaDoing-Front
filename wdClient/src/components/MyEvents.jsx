import { useState, useEffect, useContext } from "react";
import CreateEvent from "./CreateEvent";
// import EventDetail from "./EventDetail";
import EventUpdate from "./EventUpdate";
import axios from "axios";
import { authContext } from "../contexts/auth.context";
import { useParams } from "react-router-dom";

export default function MyEvents({events, getUserInfo}) {
  const { user, baseUrl, loading } = useContext(authContext);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const {username} = useParams();

  function toggleCreateEvent() {
    showCreateEvent ? setShowCreateEvent(false) : setShowCreateEvent(true);
  }
  
  // useEffect(() => {
  //   // Fetch events from the backend API
  //   axios.get(baseUrl + `/users/${username}`)
  //     .then((resp) => {
  //       console.log("events prop:", events)
  //       console.log(resp)
  //       let userEvents = resp.data.eventsCreated;
  //       console.log(userEvents);
  //       setMyEvents(userEvents);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching events:", error);
  //     });
  // }, []); 
  

  return (
    <div id="MyEvents">
      <h4>Your events</h4>
      <button
        className="btn btn-outline-primary"
        onClick={(e) => {
          e.preventDefault();
          toggleCreateEvent();
        }}
      >
        {!showCreateEvent ? <img style={{ width: "20px" }} src="plus.png" alt="create event" /> : <img style={{ width: "20px" }} src="minus.png" alt="roll up create event" />}
      </button>

      {showCreateEvent && <CreateEvent getUserInfo={getUserInfo} />}


      {events.map((event, k) => {
        return (
          <div key={k} className="card" style={{ width: "25rem" }}>
            <div className="card-body">
              <button type="button" className="btn btn-link" >
                {event.title}
              </button>
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#eventUpdate">
                Edit 
              </button>
      <EventUpdate eventInfo={event} getUserInfo={getUserInfo}/> {/* pasarle en props la id del evento correspondiente */}
              {/* <img className="card-text" src={event.icon} alt="event icon"/> */}
              <p className="card-text">{event.creator}</p>
              <p className="card-text">{event.description}</p>
              <p className="card-text">{event.location}</p>
              <p className="card-text">{event.dateTime}</p>
              <p className="card-text">{event.confirmedJoiners}</p>

            </div>
          </div>
        );
      })}
    </div>
  );
}
