import React, { useState, useContext, useEffect } from "react";
import { songscontext } from "../../store/Songs-store";
import { FaPauseCircle, FaPlay, FaTimes } from "react-icons/fa"; // Import the close icon
import styles from "./Songs.module.css";
import { fetchData } from "../../playlist/AllPlaylist";

const Songs = () => {
  const {
    isPlaying,
    currentSong,
    songs,
    dispatch,
    audioElement,
    showSidebar,
    setShowSidebar,
    selectedSongIndex,
    setSelectedSongIndex,
    handleAddSongToPlaylist,
    playlists,
    setPlaylists,
    songsArrayName,
  } = useContext(songscontext);

  if (!songs.length) {
    return <p>No songs available</p>;
  }

  useEffect(() => {
    const getPlaylists = async () => {
      const fetchedPlaylists = await fetchData();
      setPlaylists(fetchedPlaylists);
    };

    getPlaylists();
  }, []);
  useEffect(() => {}, [songs]);

  const handleSongClicked = (e, index) => {
    if (e.target.closest(`.${styles.playPauseButton}`)) {
      return; // Ignore clicks on the play/pause button
    }
    // Toggle the options for the clicked song
    setSelectedSongIndex(index);
  };

  const handleOptionClick = (index, option) => {
    if (option === "play") {
      playAudio(songs[index]);
    } else if (option === "add-to-playlist") {
      setShowSidebar(true);
    }
  };

  const playAudio = (song) => {
    const playSongAction = { type: "PLAY_SONG", payload: { song: song } };
    dispatch(playSongAction);
    audioElement.current.src = song.filePath;
    audioElement.current.play();
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
      {songs.length > 0 ? (
        songs.map((song, index) => (
          <div
            onClick={(e) => handleSongClicked(e, index)}
            className={styles.songItem}
            key={song.songNameOfSongs}
          >
            <img alt={song.songNameOfSongs} src={song.coverPath} />
            <span className={styles.songName}>{song.songNameOfSongs}</span>
            <span className={styles.songlistplay}>
              <span className={styles.timeStamp}>{song.duration}</span>
              <span className={styles.playPauseButton}>
                {isPlaying && currentSong === song ? (
                  <FaPauseCircle className={styles.icon} onClick={pauseMusic} />
                ) : (
                  <FaPlay
                    className={styles.icon}
                    onClick={() => {
                      playAudio(song);
                      setSelectedSongIndex(index);
                      // Show options when playing a song
                    }}
                  />
                )}
              </span>
              {selectedSongIndex === index && (
                <div className={styles.optionsContainer}>
                  <div className={styles.options}>
                    <button onClick={() => handleOptionClick(index, "play")}>
                      Play
                    </button>
                    <button
                      onClick={() =>
                        handleOptionClick(index, "add-to-playlist")
                      }
                    >
                      Add to playlist
                    </button>
                  </div>
                </div>
              )}
            </span>
          </div>
        ))
      ) : (
        <p className={styles.noSongs}>No songs in this playlist</p>
      )}

      {showSidebar && (
        <div className={styles.sidebar}>
          <h3>
            Your Playlists
            <FaTimes
              onClick={() => setShowSidebar(false)}
              style={{ float: "right", cursor: "pointer" }}
            />
          </h3>
          <ul className={styles.playlistList}>
            {playlists?.length > 0 ? (
              playlists.map((playlist) => (
                <li
                  onClick={(e) => {
                    console.log(playlist._id);
                    handleAddSongToPlaylist(playlist._id);
                  }}
                  key={playlist._id}
                  className={styles.playlistItem}
                >
                  {playlist.name}
                </li>
              ))
            ) : (
              <p>No playlists available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Songs;
