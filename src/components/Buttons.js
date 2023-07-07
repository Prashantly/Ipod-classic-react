import React from "react";
import { PlayPause, NextTrack, PrevTrack, Menu } from "../icons";

const Buttons = () => {
  return (
    <>
      <div className="menuBtn">
        <Menu />
      </div>
      <div className="playPauseBtn">
        <PlayPause />
      </div>
      <div className="nextBtn">
        <NextTrack />
      </div>
      <div className="prevBtn">
        <PrevTrack />
      </div>
      <div className="centerBtn"></div>
    </>
  );
};

export default Buttons;
