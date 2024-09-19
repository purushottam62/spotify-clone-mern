import React, { createContext, useEffect, useState } from "react";
export const authcontext = createContext();
const AuthContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    console.log(isAuthenticated);
  }, []);
  return (
    <authcontext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </authcontext.Provider>
  );
};

export default AuthContext;
