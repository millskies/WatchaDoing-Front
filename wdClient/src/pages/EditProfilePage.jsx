import { authContext } from "../contexts/auth.context";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function EditProfilePage() {
  const { isLoggedIn, user, loading, baseUrl } = useContext(authContext);

  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();

    const uploadPicture = new FormData();
    uploadPicture.append("image", file)

    axios.post(baseUrl + `/users/${user.userId}/upload`)
    .then(()=>{
      console.log("image uploaded??")
    })
    .catch((err)=> console.log(err))
  }

  return (
    !loading && (
      <div>
        <Navbar />
        <div>
          <form className="container">
            <div className="mb-3">
              <label htmlFor="usernameField" className="form-label">
                Email address
              </label>
              <input type="text" className="form-control" id="usernameField" aria-describedby="changeUsername" />
            </div>
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </form>
          <form onSubmit={handleUpload}  className="container">
            <div className="mb-3">
              <label>Change profile picture:</label>
              <input type="file" file={file} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <button type="submit" className="btn btn-primary ">
              Upload
            </button>
          </form>
        </div>
      </div>
    )
  );
}
