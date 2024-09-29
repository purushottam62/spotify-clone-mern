import React from "react";
import { useContext, useState } from "react";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/navigation/Navigation";
import SongsProvider, { songscontext } from "./store/Songs-store";
import Songs from "./components/Songs/Songs";

const Maincomponent = () => {
  const { audioElement } = useContext(songscontext);

  return (
    <div>
      <Navigation></Navigation>
      <Songs></Songs>
      <Footer></Footer>

      <audio ref={audioElement}></audio>
    </div>
  );
};

export default Maincomponent;
