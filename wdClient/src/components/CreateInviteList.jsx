import axios from "axios";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import Alert from "../components/Alert";
import Select from "react-select";

export default function CreateInviteList() {
  const { loadingUserInfo, user, currentUser, baseUrl, getHeaders, getUserInfo } = useContext(authContext);

  const [title, setTitle] = useState("");
  const [users, setUsers] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (title == "" || users == []) {
      setError("Please fill in both fields");
      return;
    }
    const newList = {
      title,
      users,
    };

    console.log("listaaaaaaaa:" , newList)
    axios.post(baseUrl + "/lists/create", newList, getHeaders())
    .then(()=>{
      getUserInfo()
    })
    .then(()=>{
      {window.location.href=`/${currentUser.username}`}
    })
    .catch(err => console.log(err))
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(()=>{
    if (value) {const newValue = value.map((friend)=>{
      return (
        friend.value
      )
    })
    setUsers(newValue)}
  },[value])

  const options = currentUser.friendsConfirmed.map((friend) => {
    return { value: friend._id, label: friend.username };
  });

  return (
    <div>
      <form onSubmit={submitHandler} className="container">
        {error != "" && <Alert message={error} />}
        <div className="col-6">
          <label htmlFor="title">Title of the Friends Circle:</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="col-6">
          <label htmlFor="users">Add Friends:</label>
          <Select defaultValue={value} onChange={setValue} options={options} isMulti={true} />
        </div>

        <button type="submit">Create new InviteList</button>
      </form>
    </div>
  );
}
