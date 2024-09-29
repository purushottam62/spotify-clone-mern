import React from "react";
import styles from "./ImageCardSection.module.css";
import { NavLink } from "react-router-dom";

const famousPlaylist = [
  {
    id: 1,
    name: "Top Hits",
    coverPath: "old_songs_images/top hits.jpg",
  },
  {
    id: 2,
    name: "90's Famous Song",
    coverPath:
      "old_songs_images/90s-Evergreen-Romantic-Songs-With-Jhankar-Beats-Hindi-2017-20210525151442-500x500.jpg",
  },
  {
    id: 3,
    name: "Bollywood Hits",
    coverPath: "old_songs_images/bollywood hits.jpg",
  },
  {
    id: 4,
    name: "Romantic Song",
    coverPath: "old_songs_images/romantic songs.jpg",
  },
];

const FamousPlaylist = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Famous Playlists</h2>
      <div className={styles.cardContainer}>
        {famousPlaylist.map((playlist) => (
          <NavLink to={playlist.name} key={playlist.id} className={styles.link}>
            <div className={styles.imageCard}>
              <img
                src={playlist.coverPath}
                alt={playlist.name}
                className={styles.image}
              />
              <p className={styles.playlistName}>{playlist.name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FamousPlaylist;
