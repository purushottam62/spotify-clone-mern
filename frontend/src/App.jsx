import { useContext, useState } from "react";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/navigation/Navigation.jsx";
import SongsProvider, { songscontext } from "./store/Songs-store";
import Songs from "./components/Songs/Songs";
import Maincomponent from "./Maincomponent";
import RouteError from "./Error/RouteError";

import ImageCardSection from "./Routes/ImageCardSection";
import AuthContext from "./components/AuthContext.jsx";
// import styles from "./App.css";
function App() {
  // const songsfromcontext = useContext(songscontext);
  // console.log(songsfromcontext);

  // console.log(songsfromcontext);
  return (
    <>
      <div className="p-3 mb-2 bg-dark text-white">
        <AuthContext>
          <SongsProvider>
            <RouteError>
              <ImageCardSection></ImageCardSection>
              <Maincomponent></Maincomponent>
            </RouteError>
          </SongsProvider>
        </AuthContext>
      </div>
    </>
  );
}

export default App;
