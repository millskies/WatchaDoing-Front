import { useEffect, useState, useContext } from "react";
import { authContext } from "../contexts/auth.context";
import UserCard from "../components/UserCard";
import axios from "axios";


export default function FindFriendsPage() {
  const { isLoggedIn, user, baseUrl, loading } = useContext(authContext);

  const [findFriends, setFindFriends] = useState([]);
  const [update, setUpdate] = useState(0);
  const [AlertMsg, setAlertMsg] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([])

  const updatePeople = (num, username) => {
    setAlertMsg({
      title: `Friend request sent`,
      message: `${username} will receive your friend request!`,
    });
    setUpdate(num);
  };

  //Get all users from database to display in cards
  useEffect(() => {{
    axios.get(baseUrl + "/users/all")
      .then(({data}) => {
          setAllUsers(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loading]);

//Filter for search bar
  const formOnChangeHandle = (e) => {
    setSearchResults(
      allUsers.filter((friend) => {
        return (
          friend.username.toLowerCase().includes(e.target.value.toLowerCase())
        );
      })
    );
  };

  return (
    <div className="addFriends">
      <h1 className="title">Find Friends</h1>
      <div className="input-group rounded">
        <form className="searchBar" onChange={formOnChangeHandle}>
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search users"
          />
        </form>
      </div>
      <div className="searchresults">
        {searchResults.length === 0 && <p>No results</p>}
        {searchResults.map((person) => {
            return (
              <UserCard
                person={person}
                updatePeople={updatePeople}
                key={person._id}
              />
            );
        })}
      </div>

      {/* {AlertMsg && (
        <AlertModal
          title={AlertMsg.title}
          message={AlertMsg.message}/>
      )} */}
    </div>
  );
}