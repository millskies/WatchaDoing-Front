import axios from "axios"
import { useState } from "react";
import Alert from './Alert';


const baseUrl = "http://localhost:5005/"

export default function EventUpdate({eventId}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [icon, setIcon] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState('');
  
  const submitHandler = (e) => {
    e.preventDefault();

  const event = {title, description, datetime, location};

  axios.post(baseUrl + `events/${eventId}/update`, event)
  .then(resp => {
    console.log("evento actualizado:", resp);
  })
  .catch(err => setError('Could not finish the process, try again', err))
}

const deleteHandler = (e) => {
  e.preventDefault();

const event = {title, description, datetime, location};

axios.post(`${baseUrl}/${eventId}/delete`, event)
.then(resp => {
  console.log("evento eliminado:", resp);
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
              <input type="text" name="Title" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
              <input type="text" name="Description" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
              <input type="file" name="Icon" placeholder="Icon"/><br/>
              <input type="datetime-local" name="Date" placeholder="Date" value={datetime} onChange={(e)=>setDatetime(e.target.value)}/><br/>
              <input type="text" name="location" placeholder="location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
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
  