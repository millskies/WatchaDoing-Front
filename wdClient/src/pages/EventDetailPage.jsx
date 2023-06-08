import axios from "axios";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function EventDetailPage() {
  const { loading, baseUrl, getHeaders } = useContext(authContext);
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl + "/events/" + eventId, getHeaders())
      .then(({ data }) => {
        console.log("response: ", data);
        setEvent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  return (
    <>
    {event ? <div>
      <Navbar />
      <div>
      <h3>{event.creator.username}</h3>
      </div>
    </div> : ""}    
    </>
  );
}
