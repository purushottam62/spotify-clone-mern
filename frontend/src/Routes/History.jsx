import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import styles from "./History.module.css"; // Use the new CSS module
import { fetchHistory, songscontext } from "../store/Songs-store";

const History = () => {
  const { history, dispatch, saveHistoryToBackend } = useContext(songscontext);
  const audioElement = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    const fetchedHistory = async () => {
      await saveHistoryToBackend();
      const result = await fetchHistory(); // Fetch the history once
      console.log("result is ", result);
      dispatch({
        type: "SET_HISTORY",
        payload: {
          history: result,
        },
      });
      console.log("action dispatched", result);
    };
    fetchedHistory();
  }, []);

  const requiredHistory = useMemo(() => history, [history]);

  console.log("history is ", history);
  useEffect(() => {
    return () => {
      audioElement.current.src = "";
      setIsPlaying(false);
    };
  }, []);

  const playAudio = (song) => {
    console.log(song);
    audioElement.current.src = song.filePath;
    audioElement.current.play();
  };

  const pauseMusic = () => {
    audioElement.current.pause();
  };

  if (!requiredHistory?.length)
    return <div className={styles.history}>There is no history as of now</div>;

  return (
    <div className={styles.section}>
      <h2>History</h2>

      <div className={styles.cardContainer}>
        {requiredHistory.map((song) => (
          <div className={styles.imageCard} key={song.name}>
            <img
              src={song.coverPath}
              alt="History Event"
              className={styles.image}
            />
            <div className={styles.overlay}>
              {isPlaying && currentSong === song ? (
                <button
                  onClick={() => {
                    pauseMusic();
                    setIsPlaying(false);
                  }}
                  className={styles.pauseButton}
                >
                  ❚❚
                </button>
              ) : (
                <button
                  onClick={() => {
                    playAudio(song);
                    setIsPlaying(true);
                    setCurrentSong(song);
                  }}
                  className={styles.playButton}
                >
                  ▶
                </button>
              )}
            </div>
            <p>{song.songNameOfSongs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
