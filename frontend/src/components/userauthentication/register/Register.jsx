import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../navigation/Navigation";
import styles from "./Register.module.css"; // Import your CSS module
import { authcontext } from "../../AuthContext";

const Register = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { setIsAuthenticated } = useContext(authcontext);
  const fullName = useRef("");
  const password = useRef("");
  const email = useRef("");
  const username = useRef("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append("fullName", fullName.current.value);
    formData.append("password", password.current.value);
    formData.append("email", email.current.value);
    formData.append("username", username.current.value);
    if (avatar) {
      formData.append("avatar", avatar[0]); // Append the first file
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("everything is fine ", data);

        // localStorage.setItem("accessToken", response.cookie.accessToken);
        // localStorage.removeItem("refreshToken");
        // localStorage.setItem("refreshToken", response.cookie.refreshToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Failed to register user from frontend", error);
    }
    setIsButtonDisabled(false);
    navigate("/");
  };

  return (
    <div>
      <Navigation isLogin={true} />
      <section className={`${styles.vh100} ${styles.bgPrimary}`}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <div className={`${styles.card} card`}>
                <div className={`${styles.headerSection}`}>
                  <h2 className="text-center">Create an Account</h2>
                </div>
                <form onSubmit={handleSubmit} className="card-body">
                  <div className={`${styles.inputGroup}`}>
                    <h6 className="mb-0">Full Name</h6>
                    <input
                      type="text"
                      className={`${styles.inputField}`}
                      ref={fullName}
                    />
                  </div>
                  <div className={`${styles.inputGroup}`}>
                    <h6 className="mb-0">Email Address</h6>
                    <input
                      type="email"
                      className={`${styles.inputField}`}
                      placeholder="example@gmail.com"
                      ref={email}
                    />
                  </div>
                  <div className={`${styles.inputGroup}`}>
                    <h6 className="mb-0">Password</h6>
                    <input
                      type="password"
                      className={`${styles.inputField}`}
                      placeholder="Enter your password here"
                      ref={password}
                    />
                  </div>
                  <div className={`${styles.inputGroup}`}>
                    <h6 className="mb-0">Username</h6>
                    <input
                      type="text"
                      className={`${styles.inputField}`}
                      placeholder="Enter your unique username"
                      ref={username}
                    />
                  </div>
                  <div className={`${styles.inputGroup}`}>
                    <h6 className="mb-0">Upload Profile Photo</h6>
                    <input
                      type="file"
                      className={`${styles.inputField}`}
                      onChange={(event) => setAvatar(event.target.files)}
                    />
                    <div className="small text-muted mt-2">
                      Upload your profile photo of max size 3 MB
                    </div>
                  </div>
                  <div className="text-center py-4">
                    {isButtonDisabled ? (
                      <h4>
                        Please wait while your request is being processed...
                      </h4>
                    ) : (
                      <button
                        type="submit"
                        className={`btn btn-primary btn-lg`}
                        disabled={isButtonDisabled}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </form>
                <div className={`${styles.footerSection}`}>
                  <p>
                    Already have an account?{" "}
                    <a href="/login" style={{ color: "white" }}>
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
