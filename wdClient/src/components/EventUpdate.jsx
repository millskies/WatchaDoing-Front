import axios from "axios"
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState, } from "react";
import Alert from './Alert';
import { useParams } from "react-router-dom";


export default function EventUpdate({eventInfo}) {
  const { baseUrl } = useContext(authContext);

  const [title, setTitle] = useState(eventInfo.title);
  const [description, setDescription] = useState(eventInfo.description);
  const [icon, setIcon] = useState("");
  const [datetime, setDatetime] = useState(eventInfo.dateTime);
  const [location, setLocation] = useState(eventInfo.location);
  const [error, setError] = useState('');
  const {username} = useParams("");

  
  const submitHandler = (e) => {
    e.preventDefault();

  const event = {title, description, icon, datetime, location};

  axios.post(baseUrl + `/events/${eventInfo._id}/update`, event)
  .then(resp => {
    console.log("evento actualizado:", resp);
    window.location.href = `http://localhost:5173/${username}`; //changeLater
    // this is great for automatically closing the modal. Also it does a refresh, so we will get a new axios call (nice!).
  })
  .catch(err => setError('Could not finish the process, try again', err))
}

const deleteHandler = (e) => {
  e.preventDefault();

const event = {title, description, icon, datetime, location};

axios.post(`${baseUrl}/${eventInfo._id}/delete`, event)
.then(resp => {
  console.log("evento eliminado:", resp);
  window.location.href = `http://127.0.0.1:5173/${username}`; //changeLater
})
.catch(err => setError('Could not finish the process, try again', err))
}

    return (
      <div className="modal" id="eventUpdate" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update event</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <label></label>
              <form onSubmit={submitHandler}>
              {error != '' && <Alert message={error} />}
              <input type="text" name="Title" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
              <input type="text" name="Description" placeholder="{Description}" value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
              <input type="file" name="Icon" placeholder="Icon" value={icon} onChange={(e)=>setIcon(e.target.value)}/><br/>
              <input type="datetime-local" name="Date" placeholder="{datetime}" value={datetime} onChange={(e)=>setDatetime(e.target.value)}/><br/>
              <input type="text" name="location" placeholder="{location}" value={location} onChange={(e)=>setLocation(e.target.value)}/>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
              </form>
            </div>
            <div>
              <button type="submit" onSubmit={deleteHandler} className="btn btn-danger">Delete event</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  