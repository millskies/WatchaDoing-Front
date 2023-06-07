import axios from "axios";
import { createContext, useEffect, useState } from "react";

const authContext = createContext();

const baseUrl = "http://localhost:5005";

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //false
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //true
  const [currentUser, setCurrentUser] = useState({});
  const [loadingPopulated, setLoadingPopulated] = useState(true);
  const [loadingRaw, setLoadingRaw] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [currentUserRaw, setCurrentUserRaw] = useState({});

  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    if (!user) return;
    getUserInfo();
    getUserInfoRaw();
  }, [loading]);

  useEffect(() => {
    if (!loadingRaw && !loadingPopulated) setLoadingUserInfo(false)
  }, [loadingRaw, loadingPopulated]);

  const getHeaders = () => {
    let token = localStorage.getItem("authToken");
    return { headers: { authorization: `Bearer ${token}` } };
  };

  const isAuthenticated = () => {
    // get a token:
    let token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get(baseUrl + "/auth/verify", { headers: { authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          setIsLoggedIn(true);
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
    }
  };

  const getUserInfo = () => {
    if (loading) return;
    if (!user) return;
    else {console.log("user",user)
    axios
      .get(baseUrl + "/users/" + user.username)
      .then(({ data }) => {
        // console.log("response userrr: ", data);
        setCurrentUser(data);
        setLoadingPopulated(false);
      })
      .catch((err) => {
        console.log(err);
      });}
  };

  const getUserInfoRaw = () => {
    if (loading) return;
    if (!user) return;
    else {console.log("user",user)
    axios
      .get(baseUrl + "/users/" + user.userId)
      .then(({ data }) => {
        console.log("response userrr: ", data);
        setCurrentUserRaw(data);
        setLoadingRaw(false);
      })
      .catch((err) => {
        console.log(err);
      });}
  };

  let exposedValues = {
    isLoggedIn,
    user,
    loading,
    baseUrl,
    isAuthenticated,
    getHeaders,
    getUserInfo,
    getUserInfoRaw,
    currentUser,
    currentUserRaw,
    loadingUserInfo
  };
  return <authContext.Provider value={exposedValues}>{children}</authContext.Provider>;
}

export { authContext, AuthProviderWrapper };
