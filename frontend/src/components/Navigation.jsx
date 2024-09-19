import React, { useContext } from "react";
import { FaSpotify } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { authcontext } from "./AuthContext";

const Navigation = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(authcontext);
  const navigate = useNavigate();
  const Logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch("/api/v1/user/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
      });
      if (response.ok) {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }

    return navigate("/");
  };

  return (
    <div className="text-bg-success p-2">
      <nav className="navbar navbar-expand-lg bg-green">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <FaSpotify />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Your Library
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={Logout}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
