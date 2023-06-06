import { useState, useEffect } from "react";
import CreateEvent from "./CreateEvent";
// import EventDetail from "./EventDetail";
import EventUpdate from "./EventUpdate";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:5005/";


export default function MyEvents() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const {username} = useParams();

  function toggleCreateEvent() {
    showCreateEvent ? setShowCreateEvent(false) : setShowCreateEvent(true);
  }
  
  useEffect(() => {
    // Fetch events from the backend API
    axios.get(baseUrl + `users/${username}`)
      .then((resp) => {
        let userEvents = resp.data.eventsJoined;
        console.log(userEvents);
        setMyEvents(userEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []); 

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

      {showCreateEvent && <CreateEvent />}


      {myEvents.map((event, k) => {
        return (
          <div key={k} className="card" style={{ width: "25rem" }}>
            <div className="card-body">
              <button type="button" className="btn btn-link" >
                {event.title}
              </button>
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#eventUpdate">
                Edit 
              </button>
      <EventUpdate eventId={event._id}/> {/* pasarle en props la id del evento correspondiente */}
              <p>{event.creator}</p>
              <p className="card-text">{event.description}</p>
              <p>{event.location}</p>
              <p>{event.dateTime}</p>
              <p>{event.confirmedJoiners}</p>

            </div>
          </div>
        );
      })}
    </div>
  );
}
