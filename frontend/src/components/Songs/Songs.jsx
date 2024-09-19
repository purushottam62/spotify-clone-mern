import React, { useState, useContext } from "react";
import { songscontext } from "../../store/Songs-store";
import { FaPauseCircle } from "react-icons/fa";
import styles from "./Songs.module.css";
import { FaPlay } from "react-icons/fa";

const Songs = () => {
  const { isPlaying, currentSong, songs, dispatch, audioElement } =
    useContext(songscontext);
  console.log(songs[0].coverPath);
  if (!Array.isArray(songs)) {
    return (
      <div>
        <h1>no songs</h1>
      </div>
    );
  }
  const playAudio = (song) => {
    audioElement.current.src = song.filePath;

    audioElement.current.play();
    const playSongAction = { type: "PLAY_SONG", payload: { song: song } };
    dispatch(playSongAction);
  };
  const pauseMusic = () => {
    audioElement.current.pause();
    const pauseMusicAction = {
      type: "PAUSE_MUSIC",
      payload: {
        actionpausedTime: audioElement.current.currentTime,
      },
    };
    dispatch(pauseMusicAction);
  };
  return (
    <div className={styles.container}>
      {songs.map((song) => (
        // (song) => console.log(song)
        <div className={styles.songItem} key={song.songNameOfSongs}>
          <img alt={song.songNameOfSongs} src={song.coverPath} />
          <span className={styles.songName}>{song.songNameOfSongs}</span>
          <span className={styles.songlistplay}>
            <span className={styles.timeStamp}>{song.duration}</span>
            {isPlaying ? (
              currentSong == song ? (
                <FaPauseCircle onClick={pauseMusic}> </FaPauseCircle>
              ) : (
                <FaPlay
                  onClick={() => {
                    playAudio(song);
                  }}
                />
              )
            ) : (
              <FaPlay
                onClick={() => {
                  playAudio(song);
                }}
              />
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Songs;
