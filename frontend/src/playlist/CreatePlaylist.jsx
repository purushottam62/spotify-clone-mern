import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePlaylist.module.css"; // Make sure this path is correct
import Navigation from "../components/navigation/Navigation";

const CreatePlaylist = () => {
  const createPlaylist = useRef("");
  const description = useRef("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    setDisable(true);
    const accessToken = localStorage.getItem("accessToken");

    const playListData = {
      name: createPlaylist.current.value,
      description: description.current.value,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/playlist/", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(playListData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responsedata = await response.json();
      navigate("/user-playlist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navigation></Navigation>
      <div className={styles["create-playlist-container"]}>
        <div className={styles.overlay}></div>
        <h1 className={styles.title}>🎵 Create Your Playlist 🎶</h1>
        <form
          onSubmit={handleCreatePlaylist}
          className={styles["form-container"]}
        >
          <div className={styles["input-group"]}>
            <input
              type="text"
              className={styles["form-input"]}
              placeholder="🎧 Playlist Name"
              ref={createPlaylist}
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <textarea
              className={styles["form-input"]}
              placeholder="📝 Describe Your Playlist"
              ref={description}
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles["submit-button"]} ${
              disable ? styles.disabled : ""
            }`}
            disabled={disable}
          >
            {disable ? "Creating..." : "✨ Create Playlist ✨"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePlaylist;
