import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { checkLoggedIn } from "../loginAPI";

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLoggedIn().then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(true);
        setUser(res.user);
      }
    });
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
