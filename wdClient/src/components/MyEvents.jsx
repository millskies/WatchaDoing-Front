import { useState } from "react";
import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";
import EventUpdate from "./EventUpdate";

export default function MyEvents(events) {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  function toggleCreateEvent() {
    showCreateEvent ? setShowCreateEvent(false) : setShowCreateEvent(true);
  }

  const changeLater = ["event 1", "event 2", "event 3"]; // this will be the array of eventsCreated of the current user

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

      <EventUpdate /> {/* pasarle en props la id del evento correspondiente */}

      {changeLater.map((event, k) => {
        return (
          <div key={k} className="card" style={{ width: "25rem" }}>
            <div className="card-body">
              <button type="button" className="btn btn-link" >
                {event}
              </button>
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#eventUpdate">
                Edit 
              </button>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
