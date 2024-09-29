import React from "react";
import styles from "./ImageCardSection.module.css";
import { NavLink } from "react-router-dom";
export const artists = [
  {
    name: "Rahat Fateh Ali Khan",
    image: "old_songs_images/rahat fateh ali khan.jpg",
    songs: "rahatKhan",
  },
  {
    name: "Arijit Singh",
    image: "old_songs_images/arijit singh.jpg",
    songs: "arijitSingh",
  },
  {
    name: "Atif Aslam",
    image: "old_songs_images/atif aslam.jpg",
    songs: "atifAslam",
  },
  {
    name: "Darshan Raval",
    image: "old_songs_images/darshan raval.jpg",
    songs: "darshanRaval",
  },
  {
    name: "Udit Narayan",
    image: "old_songs_images/udit narayan.jpg",
    songs: "uditNarayan",
  },
  {
    name: "Jubin Nautiyal",
    image: "old_songs_images/jubin nautiyal.jpg",
    songs: "jubinNautiyal",
  },
];
const Artists = () => {
  // Array of artists

  return (
    <div className={styles.section}>
      <h2>Artists</h2>
      <div className={styles.cardContainer}>
        {artists.map((artist, index) => (
          <div>
            <NavLink
              to={`/${encodeURIComponent(artist.songs)}`}
              key={index}
              className={styles.imageCard}
            >
              <img
                src={artist.image}
                alt={artist.name}
                className={styles.image}
              />
              <p>{artist.name}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
