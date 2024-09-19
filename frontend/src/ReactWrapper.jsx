import React, { useContext, useEffect } from "react";
import { songscontext } from "./store/Songs-store";
import Maincomponent from "./Maincomponent";
import { useParams } from "react-router-dom";

const ReactWrapper = ({ playlist }) => {
  //   const { playlistName } = useParams();
  const { dispatch } = useContext(songscontext);
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
