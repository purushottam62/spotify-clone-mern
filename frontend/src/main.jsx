import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import "./index.css";
import SongsProvider from "./store/Songs-store.jsx";
import AuthContext from "./components/AuthContext.jsx";

// Components
import ImageCardSection from "./Routes/ImageCardSection.jsx";
import ReactWrapper from "./ReactWrapper.jsx";
import Login from "./components/userauthentication/login/Login.jsx";
import Register from "./components/userauthentication/register/Register.jsx";
import CreatePlaylist from "./playlist/CreatePlaylist.jsx";
import AllPlaylist, { fetchData } from "./playlist/AllPlaylist.jsx";
import About from "./components/about/About.jsx";
import { artists } from "./Routes/Artists.jsx";

// Main App Component

const AppRouter = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const routes2 = artists.map((playlist) => ({
    path: `/${playlist.songs}`,
    element: <ReactWrapper playlist={playlist.songs} />,
  }));
  console.log(routes2);
  useEffect(() => {
    const getAllPlaylists = async () => {
      try {
        const allPlaylistOfUser = await fetchData();
        // console.log(allPlaylistOfUser);

        // Generate dynamic routes for each playlist

        const playlistRoutes = allPlaylistOfUser.map((playlist) => ({
          path: `/${playlist.name.trim()}`, // Handle special characters
          element: <ReactWrapper playlist={playlist.songs} />,
        }));

        setRoutes([
          {
            path: "/",
            element: <ImageCardSection />,
          },
          // Static routes for predefined playlists

          {
            path: "/alan-Walkar",
            element: <ReactWrapper playlist="alan-Walkar" />,
          },

          {
            path: "/create-playlist",
            element: <CreatePlaylist />,
          },
          {
            path: "/user-playlist",
            element: <AllPlaylist />,
          },

          // Dynamically generated routes for user playlists
          ...playlistRoutes,
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getAllPlaylists();
  }, []);

  // Show loading message
  if (loading) {
    return <div>Loading playlists...</div>;
  }

  // Always render the home page, even on error
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ImageCardSection />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/about",
      element: <About></About>,
    },
    {
      path: "/90's Famous Song",
      element: <ReactWrapper playlist="oldSongs" />,
    },
    {
      path: "/Top Hits",
      element: <ReactWrapper playlist="all-Songs" />,
    },
    {
      path: "/Romantic Song",
      element: <ReactWrapper playlist="romantic-Songs" />,
    },
    {
      path: "/search",
      element: <ReactWrapper />,
    },
    // {
    //   path: "/atifAslam",
    //   element: <ReactWrapper playlist="atifAslam" />,
    // },
    // {
    //   path: "/uditNarayan",
    //   element: <ReactWrapper playlist="uditNarayan" />,
    // },

    ...routes, // Include all other routes, including any that failed to load
    ...routes2,
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SongsProvider>
      <AuthContext>
        <AppRouter />
      </AuthContext>
    </SongsProvider>
  </React.StrictMode>
);
