import { authContext } from "../contexts/auth.context";
import { useContext} from "react";
import Navbar from "../components/Navbar"

export default function EditProfilePage() {
  const { isLoggedIn, user, loading, baseUrl } = useContext(authContext);

  return (
  !loading && <div>
    <Navbar/>
    <div><form className="container">
  <div className="mb-3">
    <label htmlFor="usernameField" className="form-label">Email address</label>
    <input type="text" className="form-control" id="usernameField" aria-describedby="changeUsername" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary ">Submit</button>
</form></div>
    </div>
  )
}
