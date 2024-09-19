import React, { useEffect } from "react";

const alanWalkar = () => {
  useEffect(() => {
    fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/search/?per_page=10&page=1"
    );
  }, []);
  return <div></div>;
};

export default alanWalkar;
