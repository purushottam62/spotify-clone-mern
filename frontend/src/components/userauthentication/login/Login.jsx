import React, { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navigation from "../../navigation/Navigation";
import { authcontext } from "../../AuthContext";
import styles from "./Login.module.css"; // Updated CSS import

const Login = () => {
  const { setIsAuthenticated } = useContext(authcontext);
  const navigate = useNavigate();
  const password = useRef("");
  const email = useRef("");

  const loginUser = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const post = await response.json();

      if (post.data) {
        localStorage.setItem("accessToken", post.data.accessToken);
        localStorage.setItem("refreshToken", post.data.refreshToken);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log("Error while sending login request", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Navigation isLogin={true} />

      <section className={`${styles.vh100} ${styles.bgGradient}`}>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className={`img-fluid ${styles.musicImage}`}
                alt="Music representation"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={loginUser}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button
                    type="button"
                    className={`${styles.socialButton} btn btn-primary btn-floating mx-1`}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button
                    type="button"
                    className={`${styles.socialButton} btn btn-primary btn-floating mx-1`}
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button
                    type="button"
                    className={`${styles.socialButton} btn btn-primary btn-floating mx-1`}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    ref={email}
                    required
                  />
                  <label className="form-label">Email address</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    ref={password}
                    required
                  />
                  <label className="form-label">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" />
                    <label className="form-check-label">Remember me</label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className={`${styles.loginButton} btn btn-lg`}
                  >
                    Login
                  </button>
                  <NavLink to="/register" className="link-danger">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account? Register
                    </p>
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={`${styles.footer} bg-primary`}>
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          <div>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
