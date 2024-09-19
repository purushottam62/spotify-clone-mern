import React from "react";
import styles from "./ImageCardSection.module.css";
const Artists = () => {
  return (
    <div className={styles.section}>
      <h2>Artists</h2>
      <div className={styles.cardContainer}>
        <div className={styles.imageCard}>
          <img
            src="old_songs_images/90's songs.jpeg"
            alt="Artist 1"
            className={styles.image}
          />
          <p>Artist 1</p>
        </div>
        <div className={styles.imageCard}>
          <img
            src="old_songs_images/90's songs.jpeg"
            alt="Artist 2"
            className={styles.image}
          />
          <p>Artist 2</p>
        </div>
        <div className={styles.imageCard}>
          <img
            src="old_songs_images/90's songs.jpeg"
            alt="Artist 3"
            className={styles.image}
          />
          <p>Artist 3</p>
        </div>
        <div className={styles.imageCard}>
          <img
            src="old_songs_images/90's songs.jpeg"
            alt="Artist 4"
            className={styles.image}
          />
          <p>Artist 4</p>
        </div>
        <div className={styles.imageCard}>
          <img
            src="old_songs_images/90's songs.jpeg"
            alt="Artist 5"
            className={styles.image}
          />
          <p>Artist 5</p>
        </div>
        <div className={styles.imageCard}>
          <img
            src="old_songs_images/90's songs.jpeg"
            alt="Artist 6"
            className={styles.image}
          />
          <p>Artist 6</p>
        </div>
      </div>
    </div>
  );
};

export default Artists;
