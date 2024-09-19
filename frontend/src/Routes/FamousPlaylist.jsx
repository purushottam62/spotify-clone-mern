import React from "react";
import styles from "./ImageCardSection.module.css";
import { Link, NavLink } from "react-router-dom";
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
const FamousPlaylist = () => {
  return (
    <div className={styles.section}>
      <h2>Famous Playlists</h2>
      <div className={styles.cardContainer}>
        {famousplaylist.map((playlist) => {
          return (
            <NavLink to={playlist.name} key={playlist}>
              <div className={styles.imageCard}>
                <img
                  src={playlist.coverPath}
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
  );
};

export default FamousPlaylist;
