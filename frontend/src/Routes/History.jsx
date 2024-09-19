import React from "react";
import styles from "./ImageCardSection.module.css";
const history = [
  {
    songNameOfSongs: "hawayein",
    filePath: "songs/hawayein.mp3",
    coverPath: "images/hawayein.jpg",
    duration: "04:50",
  },
];

const History = () => {
  return (
    <div className={styles.section}>
      <h2>History</h2>

      <div className={styles.cardContainer}>
        {history.map((song) => {
          return (
            <div className={styles.imageCard} key={song.name}>
              <img
                src={song.coverPath}
                alt="History Event 1"
                className={styles.image}
              />
              <p>{song.songNameOfSongs}</p>
            </div>
          );
        })}

        {/* <div className={styles.imageCard}>
          <img
            src="public/old_songs_images/90's songs.jpeg"
            alt="History Event 2"
            className={styles.image}
          />
          <p>History Event 2</p>
        </div>
        <div className={styles.imageCard}>
          <img
            src="public/old_songs_images/90's songs.jpeg"
            alt="History Event 3"
            className={styles.image}
          />
          <p>History Event 3</p>
        </div> */}
      </div>
    </div>
  );
};

export default History;
