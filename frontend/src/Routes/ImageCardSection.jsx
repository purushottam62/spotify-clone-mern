import React, { useContext, useEffect } from "react";
import styles from "./ImageCardSection.module.css"; // Import the CSS module
import History from "./History";
import FamousPlaylist from "./FamousPlaylist";
import Navigation from "../components/navigation/Navigation";
import Artists from "./Artists";
import Footer from "../components/Footer/Footer";
import { songscontext } from "../store/Songs-store";
const ImageCardSection = () => {
  const { dispatch, saveHistoryToBackend, history } = useContext(songscontext);

  return (
    <div>
      <Navigation></Navigation>
      <History></History>

      <FamousPlaylist></FamousPlaylist>
      <Artists></Artists>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default ImageCardSection;
