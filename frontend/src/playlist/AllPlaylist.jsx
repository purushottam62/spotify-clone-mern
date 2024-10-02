import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import styles from "../Routes/ImageCardSection.module.css";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

const famousplaylist = [
  {
    id: 1,
    name: "Top Hits",
    coverPath: "old_songs_images/bollywood.jpeg",
  },
  {
    id: 2,
    name: "90's Famous Song",
    coverPath: "old_songs_images/90's songs.jpeg",
  },
  {
    id: 3,
    name: "Bollywood Hits",
    coverPath: "old_songs_images/bollywood.jpeg",
  },
  {
    id: 4,
    name: "Romantic Song",
    coverPath: "old_songs_images/romantic songs.jpeg",
  },
];
let requiredPlaylists = [];
export const fetchData = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    if (!accessToken) {
      console.log(
        "you are not authenticated to see your playlist you need to be logged in to see your playlist please login "
      );
    }
    const decoded = jwtDecode(accessToken);
    const userId = decoded.id;
    console.log(userId);
    const response = await fetch(`/api/v1/playlist/user/${userId}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.log(
        "failed to receive response response is not ok",
        response.status
      );
    }
    console.log(response);
    const responsedata = await response.json();
    console.log(responsedata);
    requiredPlaylists = responsedata.data.playlists;
    console.log(requiredPlaylists);
    return requiredPlaylists;
  } catch (error) {
    console.log("error fetching data", error);
  }
};
const AllPlaylist = () => {
  const [requiredPlaylists, setRequiredPlaylist] = useState([]);
  useEffect(() => {
    const fetchedData = async () => {
      const responsedPlaylist = await fetchData();
      setRequiredPlaylist(responsedPlaylist);
    };
    fetchedData();
  }, []);
  return (
    <>
      <Navigation></Navigation>
      <div className={styles.section}>
        <h2>All of your Playlists</h2>
        {console.log(requiredPlaylists)}
        <div className={styles.cardContainer}>
          {requiredPlaylists.map((playlist) => {
            return (
              <NavLink to={`/${playlist.name.trim()}`} key={playlist.id}>
                <div className={styles.imageCard}>
                  <img
                    src={playlist?.songs[0]?.coverPath || "images/hawayein.jpg"}
                    alt="90's Songs"
                    className={styles.image}
                  />
                  <p>{playlist.name}</p>
                </div>
              </NavLink>
            );
          })}

          {/* <div className={styles.imageCard}>
          <img
            src="public/old_songs_images/90's songs.jpeg"
            alt="Romantic Songs"
            className={styles.image}
          />
          <p>Romantic Songs</p>
        </div>
        <div className={styles.imageCard}>
          <img
            src="public/old_songs_images/90's songs.jpeg"
            alt="Top Hits"
            className={styles.image}
          />
          <p>Top Hits</p>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default AllPlaylist;
