import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { CgPlayForwards } from "react-icons/cg";
import { CgPlayBackwards } from "react-icons/cg";
import { songscontext } from "../../store/Songs-store";

const Footer = () => {
  const {
    isPlaying,
    currentSong,
    dispatch,
    audioElement,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    pausedTime,
  } = useContext(songscontext);

  const seekValueRef = useRef(0);
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const progressUpdate = () => {
      setCurrentTime(audioElement.current.currentTime);
      setDuration(audioElement.current.duration);
    };
    audioElement.current.addEventListener("timeupdate", progressUpdate);
    // return () => {
    //   audioElement.current.removeEventListener("timeupdate", progressUpdate);
    // };
  }, [audioElement]);
  useEffect(() => {
    if (isPlaying) {
      if (audioElement.current.currentTime === audioElement.current.duration) {
        const playNextAction = {
          type: "PLAY_NEXT",
        };
        dispatch(playNextAction);
      }
    }
  }, [currentTime]);

  const handleseekValueChange = (event) => {
    const seekValue = event.target.value;
    audioElement.current.currentTime =
      (seekValue / 100) * audioElement.current.duration;
    console.log("seek value changed", audioElement.current.currentTime);
  };

  useEffect(() => {
    if (currentSong) {
      audioElement.current.src = currentSong.filePath;
      const playAudio = async () => {
        try {
          // console.log("playing");
          await audioElement.current.play();

          audioElement.current.currentTime = pausedTime;
        } catch (error) {
          console.log(error);
        }
      };
      if (isPlaying) {
        // console.log(currentTime);

        playAudio();
      }
    } else {
      audioElement.current.src = currentSong?.filePath;
      audioElement.current.pause();
      dispatch({
        type: "PAUSE_MUSIC",
      });
    }
    return () => {
      if (audioElement.current) {
        audioElement.current.pause();
        // console.log("pausing");
        audioElement.current.src = "";
      }
    };
  }, [isPlaying, currentSong, pausedTime]);

  const playMusic = () => {
    const playMusicAction = {
      type: "PLAY_AUDIO",
    };
    dispatch(playMusicAction);
  };
  const playBack = () => {
    const playBackAction = {
      type: "PLAY_BACK",
    };
    dispatch(playBackAction);
  };
  const playNext = () => {
    const playNextAction = {
      type: "PLAY_NEXT",
    };
    dispatch(playNextAction);
  };
  const pauseMusic = () => {
    console.log("song current time", audioElement.current.currentTime);
    const pauseMusicAction = {
      type: "PAUSE_MUSIC",
      payload: {
        actionpausedTime: audioElement?.current?.currentTime,
      },
    };

    dispatch(pauseMusicAction);
  };

  return (
    <div className="p-2  bg-dark text-white fixed-bottom">
      <input
        onChange={handleseekValueChange}
        type="range"
        name="range"
        className="form-range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        id="customRange2"
        ref={seekValueRef}
      ></input>
      <center className="fs-1">
        <CgPlayBackwards onClick={playBack} />
        {isPlaying ? (
          <FaPauseCircle onClick={pauseMusic}> </FaPauseCircle>
        ) : (
          <FaPlayCircle onClick={playMusic}> </FaPlayCircle>
        )}

        {/* <FaPauseCircle /> */}
        <CgPlayForwards onClick={playNext} />
      </center>
    </div>
  );
};

export default Footer;
