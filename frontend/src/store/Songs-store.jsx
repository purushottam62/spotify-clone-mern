import React, { useState, createContext, useReducer, useRef } from "react";
import {
  allSongsAdded,
  allSongs,
  oldSongs,
  romanticSongs,
  mindRefreshingSongs,
  partySongs,
  bhojpuriSongs,
  punjabiSOngs,
  folkSongs,
  atifAslam,
  rahatKhan,
  arijitSingh,
  jubinNautiyal,
  darshanRaval,
  uditNarayan,
} from "./Songs-storeSong";
const allUniqueSongAdded = [...new Set(allSongsAdded)];

export const sortedAllSongs = () => {
  return allUniqueSongAdded.sort((a, b) => {
    return a.songNameOfSongs
      .toLowerCase()
      .localeCompare(b.songNameOfSongs.toLowerCase());
  });
};
const playlistMap = {
  atifAslam: atifAslam,
  rahatKhan: rahatKhan,
  arijitSingh: arijitSingh,
  jubinNautiyal: jubinNautiyal,
  darshanRaval: darshanRaval,
  uditNarayan: uditNarayan,
};

const initialState = {
  isPlaying: false,
  currentSong: null,
  songs: allSongs,
  pausedTime: 0,
  songsArrayName: oldSongs,
  history: [], // Map for storing song history with O(1) lookups
};
const songsReducer = (state, action) => {
  let newState = state;

  // let playlistSong = oldSongs;
  const updateCurrentSong = (song) => {
    // Update history here if necessary
    // e.g., addSongToHistory(song);
    // console.log("update current song function called", song);

    newState.currentSong = song;
    newState.isPlaying = true; // Set isPlaying to true when a new song is played
    // // Create a copy of the history map
    // const updatedHistory = new Map(state.history);

    // // If song already exists in history, remove it
    // if (updatedHistory.has(song.songNameOfSongs)) {
    //   updatedHistory.delete(song.songNameOfSongs);
    // }

    // // Add the new song to the top of the history
    // updatedHistory.set(song.songNameOfSongs, song);

    // // Track unsaved changes
    // const updatedUnsavedHistory = new Map(state.unsavedHistory);
    // updatedUnsavedHistory.set(song.songNameOfSongs, song);
    // (newState.history = updatedHistory), // Replace with updated history
    //   (newState.unsavedHistory = updatedUnsavedHistory);
    // const updatedHistory = new Map(state.history);
    // if (updatedHistory.has(song.songNameOfSongs)) {
    //   updatedHistory.delete(song.songNameOfSongs);
    // }
    // updatedHistory.set(song.songNameOfSongs, song);
    // newState.history = updatedHistory;

    // Use filter to create a new array excluding the song to be deleted
    let updatedSongs = [];
    if (state.history) {
      updatedSongs = state.history.filter(
        (Song) => Song.songNameOfSongs !== song.songNameOfSongs
      );
    }
    updatedSongs.unshift(song);

    newState.history = updatedSongs;
    localStorage.removeItem("history");
    localStorage.setItem("history", JSON.stringify(newState.history));
    // console.log("updarted history is ", newState.history);
  };

  if (action.type === "STOP") {
    newState = {
      ...state,
      isPlaying: false,
    };
  }
  if (action.type === "SAVE_HISTORY") {
    localStorage.setItem("history", state.history);
  }
  if (action.type === "SET_HISTORY") {
    const historyArray = action.payload.history;
    // if (!historyArray) historyArray = [];

    newState = {
      ...state,
      history: historyArray,
    };
  }
  if (action.type === "SET_PLAYLIST") {
    if (action.payload.playlist === "oldSongs") {
      newState = {
        ...state,
        songs: oldSongs,
        currentSong: null,
        songsArrayName: "oldSongs",
      };
    } else if (action.payload.playlist === "all-Songs") {
      newState = {
        ...state,
        songs: allSongs,
        currentSong: null,
        songsArrayName: "allSongs",
      };
    } else if (action.payload.playlist === "romantic-Songs") {
      newState = {
        ...state,
        songs: romanticSongs,
        currentSong: null,
        songsArrayName: "romanticSongs",
      };
    } else if (playlistMap[action.payload.playlist]) {
      newState = {
        ...state,
        songs: playlistMap[action.payload.playlist], // dynamically pick songs based on playlist
        currentSong: null,
        songsArrayName: "romanticSongs", // or any other logic specific to songsArrayName
      };
    }
    // else if (action.payload.playlist === "atifAslam") {
    //   newState = {
    //     ...state,
    //     songs: atifAslam,
    //     currentSong: null,
    //     songsArrayName: "romanticSongs",
    //   };
    // }
    // else if (action.payload.playlist === "uditNarayan") {
    //   newState = {
    //     ...state,
    //     songs: uditNarayan,
    //     currentSong: null,
    //     songsArrayName: "romanticSongs",
    //   };
    // }
    else {
      newState = {
        ...state,
        songs: action.payload.playlist,
        currentSong: null,
        songsArrayName: "userPlaylist",
      };
    }

    // playlistSong = action.payload.playlist;
    // newState = {
    //   ...state,
    //   songs: playlistSong,
    //   currentSong: playlistSong[0],
    // };
  }
  if (action.type === "PLAY_AUDIO") {
    if (!state.currentSong) updateCurrentSong(state.songs[0]);
    newState = {
      ...state,
      isPlaying: true,
    };

    // else updateCurrentSong(state.currentSong);
  } else if (action.type === "PLAY_SONG") {
    updateCurrentSong(action.payload.song);
  } else if (action.type === "PAUSE_MUSIC") {
    newState = {
      ...state,
      isPlaying: false,
      pausedTime: action?.payload?.actionpausedTime || 0,
    };
  } else if (action.type === "PLAY_NEXT") {
    const index = state.songs.indexOf(state.currentSong);
    let nextSong = "";

    if (index === state.songs.length - 1) {
      nextSong = state.songs[0];
    } else {
      nextSong = state.songs[index + 1];
    }
    newState = {
      ...state,
      pausedTime: 0,
    };
    updateCurrentSong(nextSong);
  } else if (action.type === "PLAY_BACK") {
    const index = state.songs.indexOf(state.currentSong);
    let prevSong = "";
    if (index === 0) {
      prevSong = state.songs[state.songs.length - 1];
    } else {
      prevSong = state.songs[index - 1];
    }
    newState = {
      ...state,
      pausedTime: 0,
    };
    updateCurrentSong(prevSong);
  }
  return newState;
};
export const fetchHistory = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return [];
    try {
      const response = await fetch("/api/v1/user/getHistory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();

      console.log("history received as ", result);
      return result.data.songs;
    } catch (error) {
      console.log("error while sending fetch request to get history", error);
    }

    // Store fetched history in state
  } catch (error) {
    console.error("Error fetching history:", error);
  }
};

export const songscontext = createContext();

const SongsProvider = ({ children }) => {
  const audioElement = useRef(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  const [state, dispatch] = useReducer(songsReducer, initialState);

  const handleAddSongToPlaylist = (playlistId) => {
    // console.log("handle add song to playlist called");
    const accessToken = localStorage.getItem("accessToken");
    // console.log("access token got");
    const songIndex = selectedSongIndex;
    // if (songIndex === null) return; // Ensure a song is selected
    // console.log(songIndex);

    const selectedSong = state.songs[songIndex]; // Access the song using the stored index
    // console.log("sending song to get added on playlist");

    // Perform the necessary logic to add the song to the playlist
    fetch(`/api/v1/playlist/add/${playlistId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        song: state.songs[songIndex],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Song added to playlist:", data);
      })
      .catch((error) => {
        console.error("Error adding song to playlist:", error);
      });
    setShowOptions(false);
    setShowSidebar(false);
  };
  const saveHistoryToBackend = () => {
    const history = localStorage.getItem("history");

    if (!history) return;

    console.log(history, "history is ready to be saved on backend");

    const setHistory = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        try {
          const response = await fetch("/api/v1/user/setHistory", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: history,
          });
          const result = await response.json();
          if (response.ok) {
            localStorage.removeItem("history");
          }
          // console.log(result, "set history response received as");
          return result.data;
        } catch (error) {
          console.log("error while sending request to set set history", error);
        }

        // Store fetched history in state
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    setHistory();
  };
  return (
    <songscontext.Provider
      value={{
        ...state,
        dispatch,
        audioElement,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        showOptions,
        setShowOptions,
        showSidebar,
        setShowSidebar,

        selectedSongIndex,
        setSelectedSongIndex,
        handleAddSongToPlaylist,
        playlists,
        setPlaylists,
        saveHistoryToBackend,
      }}
    >
      {children}
    </songscontext.Provider>
  );
};

export default SongsProvider;
