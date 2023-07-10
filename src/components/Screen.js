import React from "react";
import { Battery } from "../assets";
import raceCar from "../assets/race-car-racing.gif";
import settings from "../assets/settings.gif";
import MusicAlbums from "./Music";
import MusicPlayer from "./MusicPlayer";

const Screen = (props) => {
  const {
    displayHome,
    displayCoverflow,
    displayMusic,
    displayGames,
    displaySettings,
  } = props.currentState.visibleComponent;

  const { pageTitle, isMusicPlayerActive } = props.currentState;
  // console.log(pageTitle);

  let renderComponent = null;

  // console.log(props.currentState.songs[props.currentState.activeSongId]);
  // console.log(props.currentState.activeSongId);
  // console.log(props.currentState.isMusicPlaying);

  if (displayHome) {
    renderComponent = (
      <div className="menu-options">
        <div id="coverflow" className="option selected">
          Cover Flow
        </div>
        <div id="music" className="option">
          Music
        </div>
        <div id="games" className="option">
          Games
        </div>
        <div id="settings" className="option">
          Settings
        </div>
      </div>
    );
  } else if (displayCoverflow) {
    renderComponent = (
      <div>
        <h1>Cover Flow</h1>
      </div>
    );
  } else if (displayMusic) {
    if (isMusicPlayerActive) {
      console.log("Render Music Player");
      renderComponent = (
        <MusicPlayer
          song={props.currentState.songs[props.currentState.activeSongId]}
          songId={props.currentState.activeSongId}
          isMusicPlaying={props.currentState.isMusicPlaying}
        />
      );
    } else {
      renderComponent = (
        <MusicAlbums
          songId={props.currentState.activeSongId}
          songs={props.currentState.songs}
        />
      );
    }
  } else if (displayGames) {
    renderComponent = (
      <div className="gameWrapper">
        <img src={raceCar} alt="car game" />;
      </div>
    );
  } else if (displaySettings) {
    renderComponent = (
      <div className="gameWrapper">
        <img src={settings} alt="settings" />;
      </div>
    );
  }

  return (
    <div className="screen custom">
      <div className="titlebar">
        <div className="play-icon">
          {/* display play icon */}
          <i className="fa-solid fa-circle-play"></i>
          {/* <i class="fa-solid fa-compact-disc fa-spin"></i> */}
        </div>
        <div className="title">
          {/* display title of page */}
          {pageTitle}
        </div>
        <div id="battery" className="battery small">
          {/* display battery */}
          <Battery />
        </div>
      </div>
      {renderComponent}
    </div>
  );
};

export default Screen;
