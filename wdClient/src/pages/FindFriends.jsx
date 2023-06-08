import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PersonFindFriends from "../../components/Person/PersonFindFriends";

let friendsSearch;

function FindFriendsPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [findFriends, setFindFriends] = useState([]);
  const [update, setUpdate] = useState(0);
  const [AlertMsg, setAlertMsg] = useState('');

  const updatePeople = (num, username) => {
    setAlertMsg({
      title: `Friend request sent`,
      message: `${username} will receive your friend request!`,
    });
    setUpdate(num);
  };

  useEffect(() => {{
    //make axios call when new route to get all users implemented
        .then((result) => {
          friendsSearch = result.data;
          setAddFriends(friendsSearch);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, update]);

  const formOnChangeHandle = (e) => {
    let searchFriend = [...friendsSearch];
    setAddFriends(
      searchFriend.filter((friend) => {
        return (
          friend.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          friend.username.toLowerCase().includes(e.target.value.toLowerCase())
        );
      })
    );
  };

  const errorHandler = () => {
    setAlertMsg(null);
  };

  return (
    <div className="addFriendsDiv">
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
      <div className="contentContainerAddF">
        {addFriends.length === 0 && <p>No results</p>}
        {addFriends.map((person) => {
          if (person.username !== "moderador") {
            return (
              <PersonAddFriends
                person={person}
                updatePeople={updatePeople}
                key={person._id}
              />
            );
          }
        })}
      </div>
      {AlertMsg && (
        <AlertModal
          title={AlertMsg.title}
          message={AlertMsg.message}
          onErrorClick={errorHandler}
        />
      )}
    </div>
  );
}

export default FindFriendsPage;