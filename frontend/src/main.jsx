import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SongsProvider from "./store/Songs-store.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Maincomponent from "./Maincomponent.jsx";
import ImageCardSection from "./Routes/ImageCardSection.jsx";
import ReactWrapper from "./ReactWrapper.jsx";
import Login from "./components/userauthentication/Login.jsx";
import Register from "./components/userauthentication/Register.jsx";

import AuthContext from "./components/AuthContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageCardSection></ImageCardSection>,
  },
  {
    path: "/90's Famous Song",
    element: <ReactWrapper playlist="oldSongs"></ReactWrapper>,
  },
  {
    path: "/all-Songs",
    element: <ReactWrapper playlist="all-Songs"></ReactWrapper>,
  },
  {
    path: "/Romantic Song",
    element: <ReactWrapper playlist="romantic-Songs"></ReactWrapper>,
  },
  {
    path: "/alan-Walkar",
    element: <ReactWrapper playlist="alan-Walkar"></ReactWrapper>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SongsProvider>
      <AuthContext>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </SongsProvider>
  </React.StrictMode>
);
