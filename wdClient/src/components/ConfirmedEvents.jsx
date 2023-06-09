import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ConfirmedEvents() {
  const { currentUser, user, loading, baseUrl, getHeaders } = useContext(authContext);

  return (
    <div className="ConfirmedEvents">
      {currentUser.eventsJoined && currentUser.eventsJoined.map((event)=>{
        return (<div key={event._id}>
          <h4>{event.title}</h4>
        <p>{event.description}</p>
        <p>{event.location}</p>
        <p>{ new Date(event.dateTime).toLocaleString()}</p>

        <div className="moreinfo">
        <Link to={`/events/${event._id}`}>More details</Link>
        </div>
        <hr className="newevents"></hr>
        </div>)
      })}
    </div>
  )
}
