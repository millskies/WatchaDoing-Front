import axios from "axios";
import { authContext } from "../contexts/auth.context";
import { useState, useContext } from "react";
import Alert from "./Alert";
// import { useParams } from "react-router-dom";
import AutoComplete from "react-google-autocomplete";


export default function EventUpdate({ eventInfo }) {
  //._id} eventTitle={event.title} eventDescription={event.description} eventLocation={event.location} eventDateTime={event.dateTime} eventConfirmedJoiners={event.confirmedJoiners
  const { baseUrl, getUserInfo, getHeaders } =
    useContext(authContext);

  const [title, setTitle] = useState(eventInfo.title);
  const [description, setDescription] = useState(eventInfo.description);
  const [icon, setIcon] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState(eventInfo.location);
  const [error, setError] = useState("");
  // const { username } = useParams("");
 

  const dateHandler = (e) => {
    console.log("----", e.target.value);
    setDatetime(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const event = { title, description, icon, dateTime: datetime, location };
    console.log("@@@", event);
    axios
      .post(baseUrl + `/events/${eventInfo._id}/update`, event, getHeaders())
      .then((resp) => {
        console.log("evento actualizado:", resp);
        getUserInfo();
      })
      .catch((err) => setError("Could not finish the process, try again", err));
  };

 

  return (
    <div className="modal" id="eventUpdate" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update event</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={submitHandler}>
              {error != "" && <Alert message={error} />}
            <label>Title</label>
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
              <br />
              <label>Description</label>
              <input
                type="text"
                placeholder="{Description}"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <label>Icon</label>
              <input
                type="file"
                placeholder="Icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
              <br />
              <label>When?</label>
              <input
                type="datetime-local"
                placeholder="{datetime}"
                value={datetime}
                onChange={dateHandler}
                data-date-format="DD MMMM YYYY"
              />
              <br />
              <div className="mb-3">
                <label htmlFor="location" className="form-label" value={location}
                onChange={(e) => setLocation(e.target.value)}>
                  Where?
                </label>
                <AutoComplete className="autocomplete" 
                  apiKey={"AIzaSyDs5I5np83v56WXBt2JMvkUJSx_BWZETQw"}
                  options={{
                    componentRestrictions: { country: "es" },
                    fields: ["address_components", "geometry", "icon", "name"],
                    strictBounds: false,
                    types: ["establishment", "geocode"],
                  }}
                  onPlaceSelected={(place) => {
                    setLocation(place.formatted_address);
                    setLat(place.geometry.location.lat());
                    setLng(place.geometry.location.lng());
                    console.log("address: ", place);
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
