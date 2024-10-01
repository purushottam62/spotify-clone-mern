import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

export const authcontext = createContext();

const AuthContext = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isTokenExpired = () => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log(currentTime);
    console.log(decoded.exp);
    console.log(decoded.exp < currentTime);
    return decoded.exp < currentTime;
  };
  const refreshAcessToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken) localStorage.removeItem(accessToken);
    setIsAuthenticated(false);
    if (!refreshToken) {
      setIsAuthenticated(false);
      redirect("/login");
    } else {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/refreshToken",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: refreshToken }),
        }
      );
      console.log(response);

      if (response.ok) {
        localStorage.setItem("accessToken", response.cookie.accessToken);
        localStorage.removeItem("refreshToken");
        localStorage.setItem("refreshToken", response.cookie.refreshToken);
        setIsAuthenticated(true);
      }
    }
  };

  useEffect(() => {
    setIsAuthenticated(!isTokenExpired);
    console.log(isAuthenticated);
    const refreshToken = localStorage.getItem("refreshToken");

    if (isTokenExpired() && refreshToken) {
      refreshAcessToken();
    }
  }, []);
  return (
    <authcontext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </authcontext.Provider>
  );
};

export default AuthContext;
