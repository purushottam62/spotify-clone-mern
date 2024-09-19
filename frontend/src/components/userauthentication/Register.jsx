import React, { useRef, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import Navigation from "../Navigation";

const Register = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const fullName = useRef("");
  const password = useRef("");
  const email = useRef("");
  const username = useRef("");
  const [avatar, setavatar] = useState("");
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
    console.log(formData);
    fullName.current.value = "";
    password.current.value = "";
    email.current.value = "";
    username.current.value = "";
    setavatar("");
    // const formData = {
    //   fullName: fullName.current.value,
    //   password: password.current.value,
    //   email: email.current.value,
    //   username: username.current.value,
    //   avatar: avatar,
    // };
    if (!formData) console.log("no form data found");
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/register",
        {
          method: "POST",

          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      console.log(response);
    } catch (error) {
      console.log("failed to register user from frontend", error);
    }
    setIsButtonDisabled(false);
    navigate("/");
  };

  return (
    <div>
      <Navigation></Navigation>
      <section className="vh-100" style={{ backgroundColor: "#2779e2" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              {/* Corrected style attribute here */}
              <div className="card" style={{ borderRadius: "15px" }}>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  className="card-body"
                >
                  <div className="row align-items-center pt-4 pb-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Full name</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="fullName"
                        ref={fullName}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Email address</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="example@gmail.com"
                        name="email"
                        ref={email}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Password</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Enter your password here"
                        name="password"
                        ref={password}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Enter your unique username"
                        name="username"
                        ref={username}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  {/* Changed the label here for clarity */}
                  <hr className="mx-n3" /> {/* Fixed unclosed hr tag */}
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Upload Profile Photo</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        name="avatar"
                        onChange={(event) => {
                          setavatar(event.target.files);
                        }}
                      />
                      <div className="small text-muted mt-2">
                        upload your profile photo of max size 3 mb
                      </div>
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="px-5 py-4">
                    {isButtonDisabled ? (
                      <div className="text-center py-4">
                        <h4>
                          Please wait while your request is being processed...
                        </h4>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-lg"
                        disabled={isButtonDisabled}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
