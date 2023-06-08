import "../css/auth.css";
import axios from "axios"
import { authContext } from '../contexts/auth.context';
import {Navigate, useNavigate} from 'react-router-dom';
import { useContext, useState } from "react";
import Alert from '../components/Alert';
import NavbarLoggedOut from "../components/NavbarLoggedOut";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {isLoggedIn, loading, baseUrl} = useContext(authContext);


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
    
    axios.post(baseUrl + '/auth/signup', user)
    .then(resp => {
      console.log(resp);
      navigate('/login');
    })
    .catch(err => setError('Could not finish the process, try again', err))
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
          
          <button type="submit" className="signup">
            SIGN UP
          </button>
        </form>
      </div>
    </>
  );
}
