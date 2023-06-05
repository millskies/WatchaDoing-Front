import axios from "axios";
import { createContext, useEffect, useState } from "react";

const authContext = createContext();

const baseUrl = "http://localhost:5005/";

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isAuthenticated();
  }, []);

  const getHeaders = () => {
    let token = localStorage.getItem("authToken");
    return { headers: { authorization: `Bearer ${token}` } };
  };

  const isAuthenticated = () => {
    //get a token:
    let token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get(baseUrl + "/verify", {
          headers: { authorization: `Bearer ${token}` },
        })
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

  let exposedValues = {
    isLoggedIn,
    user,
    loading,
    baseUrl,
    isAuthenticated,
    getHeaders,
  };
  return (
    <authContext.Provider value={exposedValues}>
      {children}
    </authContext.Provider>
  );
}

export { authContext, AuthProviderWrapper };
