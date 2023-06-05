import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { authContext } from "../contexts/auth.context"

const baseUrl = "http://localhost:5005/";
let token = localStorage.getItem('authToken');

export default function CreateEvent() {
  // const userId = token.  ---> how do I get the userId from the context?
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState(null);
  // const [invited, setInvited] = useState([]);

  const dropDown = () => {
    const [dropdownData, setDropdownData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemSelected = (item) => {
      setSelectedItems([...selectedItems, item]);
    };

  const submitHandler = (e) => {
    e.preventDefault();
    let newEvent = { title, description, date, time, location, invited };
    // createEventFunc(newEvent);
    createEvent(newEvent)}

  useEffect(() => {
    axios.get(baseUrl + `/users/${userId}`)
    .populate('inviteLists')
    .populate('friendsConfirmed')
    .then((user) => {
      setUser(user);
      let friendsAndLists = [user.friendsConfirmed, user.inviteLists]
      setDropdownData(friendsAndLists)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Create new event</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">When?</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">What time?</label>
          <input type="date" className="form-control" value={time} onChange={(e) => setTime(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Where?</label>
          <input type="" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="icon" className="form-label">Select icon</label>
          <input type="text" className="form-control" value={icon} onChange={(e) => setTitle(e.target.value)}/>
        </div>

        {/* Dropdown to select friends & lists to invite */}
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >Invite friends</button>
        <select class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {dropdownData.map((item) => (
        <option class="dropdown-item" key={item.id} onClick={() => handleItemSelected(item)}>
          {item.username}
        </option>
      ))}
        </select>

      {/* checkbox to allow invited to invite their friends */}
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
