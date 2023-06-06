import axios from "axios";
import { useState } from "react";
import Alert from '../components/Alert';

export default function CreateInviteList() {
    const [title, setTitle] = useState("");
    const [users, setUsers] = useState([])
    const [error, setError] = useState('');



    const submitHandler = (e) => {
        e.preventDefault();
        if(title == '' || users == []) {
            setError("Please fill in both fields")
            return;
        } 

    }

  return (
    <div>
    <form onSubmit={submitHandler} className="container">
        {error != '' && <Alert message={error} />}
          <div className="col-6">
            <label htmlFor="title">Title of the InviteList:</label>
            <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className="col-6">
            <label htmlFor="users">Add Friends to your InviteList:</label>
            <input id="users" type="users" name="users" value={users} onChange={(e)=>setUsers(e.target.value)}/>
          </div>
          <button type="submit">
            Create new InviteList
          </button>
        </form>  
    </div>
  )
}
