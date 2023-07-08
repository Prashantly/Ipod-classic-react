import React from "react";
import { PlayPause, NextTrack, PrevTrack, Menu } from "../icons";

const IpodWheel = (props) => {
  return (
    <div id="circle">
      <div className="menuBtn" onClick={props.onMenuBtnClick}>
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
      <div className="centerBtn" onClick={props.onCenterBtnClick}></div>
    </div>
  );
};

export default IpodWheel;
