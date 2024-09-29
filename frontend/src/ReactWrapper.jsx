import React, { useContext, useEffect } from "react";
import { songscontext } from "./store/Songs-store";
import Maincomponent from "./Maincomponent";
import { useLocation, useParams } from "react-router-dom";

const ReactWrapper = ({ playlist }) => {
  //   const { playlistName } = useParams();
  if (!playlist) {
    const location = useLocation();
    const result = location.state;
    console.log("result is ", result);
    playlist = result.result;
  }
  const { dispatch, isPlaying } = useContext(songscontext);
  useEffect(() => {
    // console.log("plalist name is ", playlistName);
    const setPlaylistAction = {
      type: "SET_PLAYLIST",
      payload: {
        playlist: playlist,
      },
    };
    // console.log(setPlaylistAction.payload.playlist);
    dispatch(setPlaylistAction);
  }, [dispatch, playlist]);
  return <Maincomponent></Maincomponent>;
};

export default ReactWrapper;
