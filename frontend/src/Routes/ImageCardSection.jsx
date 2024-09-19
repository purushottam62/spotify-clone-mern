import React from "react";
import styles from "./ImageCardSection.module.css"; // Import the CSS module
import History from "./History";
import FamousPlaylist from "./FamousPlaylist";
import Navigation from "../components/Navigation";
import Artists from "./Artists";
import Footer from "../components/Footer/Footer";
const ImageCardSection = () => {
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
