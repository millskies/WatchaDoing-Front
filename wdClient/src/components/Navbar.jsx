import { Link } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { useEffect, useState, useContext } from "react";
import "../css/Navbar.css"
import axios from "axios";


export default function Navbar() {
  const { user, baseUrl, loading, currentUser } = useContext(authContext);
  const { username } = user;

  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [text, setText] = useState("");

   //Get all users from database
   useEffect(() => {{
    axios.get(baseUrl + "/users/all")
      .then(({data}) => {
        setAllUsers(data.filter((user) => {
          return (user.username != currentUser.username);
            }))
        })
        .catch((err) => console.log(err));
    }
  }, [loading]);



  useEffect(() => {
    console.log('********allUsers: ', allUsers)
    console.log('********Searchresults: ', searchResults)
  }, [allUsers, searchResults])

  //Filter for search bar
  const formOnChangeHandle = (text) => {
    let searchFilter= allUsers.filter((user) => {
    return (user.username.toLowerCase().includes(text.toLowerCase()) );
      })
      setSearchResults(searchFilter);
  };

  useEffect(() => {
    formOnChangeHandle(text)
    console.log("")
  }, [text]);

  return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src="https://res.cloudinary.com/dqzjo5wsl/image/upload/v1686301470/watchadoin/xseovpeuapuiazq5j2j0.png"/></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/${username}`}
                >Profile</Link>
              </li>
              <li>
              <Link className="nav-link active"
                  aria-current="page" to="/logout">Sign out</Link>
              </li>
              {/* <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  More</Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="link" to="/notifications">Notifications</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">Sign out</Link>
                  </li>
                </ul>
              </li> */}
            </ul>
            <div className=" search-form">
            <form  className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search users"
                aria-label="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
              {/* <button className="btn btn-outline-success">X</button> */}
            </form>
           
            {searchResults.length === 0 || searchResults.length === allUsers.length && ""}
            {searchResults.length > 0 && (
             <ul className="" aria-labelledby="searchDropdown">
              {searchResults.map((user) => (
              <li className="dropdown-item" key={user._id}>
              <img className="profilepicture" src={user.picture} alt={user.username}/>
              <Link id="namelink" to={`/${user.username}`}>{user.username}</Link>
              {/* <button className="add-friend-button">Add Friend</button> */}
                  </li>
                ))}
              </ul>
                  )}
                  </div>
          </div>
        </div>
      </nav>
       
 
  );
}
