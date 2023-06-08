import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import AutoComplete from "react-google-autocomplete";

export default function CreateEvent({toggleCreateEvent}) {
  
  const {username} = useParams();
  const {baseUrl, user, getHeaders} = useContext(authContext);

  
  //State variables 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('')
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [location, setLocation] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inviteAll, setInviteAll] = useState(false);

 useEffect(()=>{
   console.log('-----Selected Items:', selectedItems)
 },[selectedItems])

 useEffect(()=>{
  if(inviteAll) setSelectedItems(dropdownData)
},[inviteAll])

const handleItemSelected = (item) => {
    setSelectedItems([...selectedItems, item._id]);
    };


//------------ CREATING EVENT, USING BE /EVENT/CREATE ROUTE -------------
  const submitHandler = (e) => {
    e.preventDefault();
    let coordinates = { lat, lng}
    let pendingJoiners = [...new Set(selectedItems)]
    let newEvent = { 
      title, 
      creator: user.userId,
      description, 
      dateTime, 
      location, 
      coordinates, 
      pendingJoiners};
      
    axios.post(baseUrl + "/events/create", newEvent)
    .then((res) => {
      console.log("event created", res);
      toggleCreateEvent();
    })
    .catch((err) => {
      console.log(err);
    });
  };

//------------------ CREATE NOTIFICATION (maybe)---------------------



  //Fetching user friends + invitelists to populate the dropdown and allow to select friends to invite
  useEffect(() => {
    axios.get(baseUrl + `/users/${username}`)
    .then(({data}) => {
      let friendsAndLists = [...data.friendsConfirmed, ...data.inviteLists]
      setDropdownData(data.friendsConfirmed)
      console.log('############', friendsAndLists)
    })
    .catch((err) => {
      console.log(err);
    });

    // -------------- CONFIGURING GOOGLE MAPS API ---------------
      // const center = { lat: 50.064192, lng: -130.605469 };
      // Create a bounding box with sides ~10km away from the center point
        // const defaultBounds = {
        //   north: center.lat + 0.1,
        //   south: center.lat - 0.1,
        //   east: center.lng + 0.1,
        //   west: center.lng - 0.1};
    
        // const input = document.getElementById("location");
        // const autocomplete = new google.maps.places.Autocomplete(input, options);
  }, [])

  return (
    <>
      <h1>Create new event</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={title} required onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="dateTime" className="form-label">When?</label>
          <input type="datetime-local" className="form-control" value={dateTime} onChange={(e) => setDateTime(e.target.value)}/>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="date" className="form-label">What time?</label>
          <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)}/>
        </div> */}

{/* Select location, using Google places API */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Where?</label>
        <AutoComplete apiKey={'AIzaSyDs5I5np83v56WXBt2JMvkUJSx_BWZETQw'} 
        options={{
          componentRestrictions: { country: "es" },
          fields: ["address_components", "geometry", "icon", "name"],
          strictBounds: false,
          types: ["establishment", "geocode"]}}

        onPlaceSelected={(place) =>{
        setLocation(place.name );
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());
        console.log("address: ", place)}}/>
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
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {dropdownData.map((item) => (
              <button type="button" className="dropdown-item" key={item._id} onClick={() => handleItemSelected(item)}>
                {item.username}
              </button>
            ))}
          </div>
        </div>


        <div className="col-6 dropdown">
          <label htmlFor="users">Invite Friends:</label>
          <Select defaultValue={value} onChange={setValue} options={friendsAndLists} isMulti={true} />
        </div>

        {/* --------------display all selected users NOT WORKING< changeLater--------------- */}
        <div>
          {selectedItems.map((user) => (
           <p key={user._id}>{user.username}</p>))}
        </div>


{/* ---------------- checkbox to invite to invite all friends ------------------ */}
        <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" 
        onChange={() => setInviteAll(!inviteAll)} />
          <label className="form-check-label" htmlFor="exampleCheck1">
          Invite all your friends
          </label>
        </div>

{/* ----------------- checkbox to allow invited to invite their friends ----------------- */}
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