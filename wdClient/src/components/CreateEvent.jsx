import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import AutoComplete from "react-google-autocomplete";

export default function CreateEvent() {
  
  const {username} = useParams();
  const {baseUrl, user} = useContext(authContext);

  
  //State variables 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemSelected = (item) => {
    setSelectedItems([...selectedItems, item._id]);
  };

  //calls the backend route to create the event
  const submitHandler = (e) => {
    e.preventDefault();
    let coordinates = { lat, lng}
    let dateTime = "check how to do this with luxon" //changeLater
    let newEvent = { 
      title, 
      creator: user.userId,
      description, 
      dateTime, 
      address, 
      coordinates, 
      selectedItems };
    axios.post(baseUrl + "/events/create", newEvent)
    .then((res) => {
      console.log("event created", res)
    })
    .catch((err) => {
      console.log(err);
      // navigate("/404");
    });
  };

  //Fetching user friends + invitelists to populate the dropdown and allow to select friends to invite
  useEffect(() => {
    axios.get(baseUrl + `/users/${username}`)
    .then(({data}) => {
      let friendsAndLists = [...data.friendsConfirmed, ...data.inviteLists]
      setDropdownData(friendsAndLists)
    })
    .catch((err) => {
      console.log(err);
      // navigate("/404");
    });
  }, [])


// CONFIGURING GOOGLE MAPS API
  const center = { lat: 50.064192, lng: -130.605469 };
  // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1};

    const input = document.getElementById("location");

    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "es" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["establishment", "address"]};
      
    const autocomplete = new google.maps.places.Autocomplete(input, options);

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
          <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)}/>
        </div>

{/* Select location, using Google places API */}

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Where?</label>

        <AutoComplete apiKey={'AIzaSyDs5I5np83v56WXBt2JMvkUJSx_BWZETQw'} onPlaceSelected={(place) =>
        // setAddress(place );
        // setLat(place.geometry.location.lat());
        // setLng(place.geometry.location.lng());
        console.log("address: ", place.formatted_address)} />

          {/* <input id="loctation" type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}/> */}
        </div>
        {/* <div className="mb-3">
          <label htmlFor="icon" className="form-label">Select icon</label>
          <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)}/>
        </div> */}

        {/* Dropdown to select friends & lists to invite */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >Invite friends</button>
        <select className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {dropdownData.map((item) => (
        <option className="dropdown-item" key={item.id} onClick={() => handleItemSelected(item)}>
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