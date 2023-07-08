import React from "react";
import { Battery } from "../icons";

const Screen = () => {
  return (
    <div className="screen">
      <div className="titlebar">
        <div className="play-icon">
          {/* display play icon */}
          <i class="fa-solid fa-circle-play"></i>
          {/* <i class="fa-solid fa-compact-disc fa-spin"></i> */}
        </div>
        <div className="title">
          {/* display title of page */}
          {/* {title} */}
          ipod
        </div>
        <div id="battery" className="battery small">
          {/* display battery */}
          <Battery />
        </div>
      </div>
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
    </div>
  );
};

export default Screen;
