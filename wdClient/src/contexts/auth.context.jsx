import axios from "axios";
import { createContext, useEffect, useState } from "react";

const authContext = createContext();

const baseUrl = 'http://localhost:5005';
const baseUrl2 = import.meta.env.VITE_API_URL; //changeLater

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
    console.log('&&&&&&&&&&&&&&&URL2: ', baseUrl2)
  }, []);

  useEffect(() => {
    if (!user) return;
    getUserInfoRaw();
    getUserInfo();
  }, [loading]);

  useEffect(() => {
    if (!loadingRaw && !loadingPopulated) setLoadingUserInfo(false);
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

  // function for retrieving current user data (populated)!
  const getUserInfo = () => {
    if (loading) return;
    if (!user) return;
    else {
      axios
        .get(baseUrl + "/users/" + user.username)
        .then(({ data }) => {
          setCurrentUser(data);
          setLoadingPopulated(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // function for retrieving current user data, UNPOPULATED!
  const getUserInfoRaw = () => {
    if (loading) return;
    if (!user) return;
    else {
      setLoadingRaw(true);
      axios
        .get(baseUrl + "/users/" + user.username + "/raw")
        .then(({ data }) => {
          setCurrentUserRaw(data);
          setLoadingRaw(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    loadingUserInfo,
    loadingRaw,
  };
  return <authContext.Provider value={exposedValues}>{children}</authContext.Provider>;
}

export { authContext, AuthProviderWrapper };
