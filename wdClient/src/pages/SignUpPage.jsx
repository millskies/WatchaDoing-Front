import "../css/auth.css";
import axios from "axios"
import { authContext } from '../contexts/auth.context';
import {Navigate, useNavigate} from 'react-router-dom';
import { useContext, useState } from "react";
import Alert from '../components/Alert';
import NavbarLoggedOut from "../components/NavbarLoggedOut";
const baseUrl = "http://localhost:5005/auth"

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [picture, setPicture] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const {isLoggedIn, loading} = useContext(authContext);

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData(); //FormData sirve para simular el objeto que recibiríamos de un formulario pero sin necesidad de tener un formulario.

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("picture", e.target.files[0]);
    setPicture("uploading");
    //service //call to axios
    axios.post(baseUrl + "/upload", uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setPicture(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //do submit things:

    if(username == '' || password == '' || passwordRepeat == '') {
      console.log("error: fields missing");
      setError("error: fields missing")
      return;
    } 
    if(password != passwordRepeat) {
      console.log("passwords should match");
      setError("error: passwords should match")
      return;
    }

    const user = {username, email, password, passwordRepeat};
    console.log("useeeeeer: ", user)

    axios.post(baseUrl + '/signup', user)
    .then(resp => {
      console.log(resp);
      navigate('/login');
    })
    .catch(err => setError('Could not finish the process, try again'))

  }

  if(!loading && isLoggedIn) return <Navigate to="/dashboard" />

  return (
    <>
      <NavbarLoggedOut />
      <div id="signUp">
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler} className="container signup-form">
        {error != '' && <Alert message={error} />}
          <div className="col-3">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Your username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="col-3">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="col-3">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="col-3">
            <label htmlFor="passwordRepeat">Password Repeat</label>
            <input id="passwordRepeat" type="password" name="passwordRepeat" placeholder="Repeat your password" value={passwordRepeat} onChange={(e)=>setPasswordRepeat(e.target.value)}/>
          </div>

          <label>Image:</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />

          <button type="submit" className="signup">
            SIGN UP
          </button>

          {/* Need to implement error alert */}
        </form>
      </div>
    </>
  );
}
