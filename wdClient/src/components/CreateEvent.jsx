import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "http://localhost:5005/";
let token = localStorage.getItem('authToken');

export default function CreateEvent() {
  const userId = token.
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [dateTime, setDateTime] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    axios.get(baseUrl + `/users/${userId}`)
  })

  return (
    <>
      <h1>Create new event</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">When?</label>
          <input type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Where?</label>
          <input type="" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="icon" className="form-label">Select icon</label>
          <input type="text" className="form-control" />
        </div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >Dropdown button</button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a class="dropdown-item" href="#">Action</a>
            </li>
          </ul>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Allow your friends to share this event
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </>
  );
}
