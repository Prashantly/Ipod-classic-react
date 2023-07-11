import React from "react";
import { PlayPause, NextTrack, PrevTrack, Menu } from "../assets";

const IpodWheel = (props) => {
  return (
    <div id="circle">
      <div className="menuBtn" onClick={props.onMenuBtnClick}>
        <Menu />
      </div>
      <div className="playPauseBtn" onClick={props.onPlayPauseClick}>
        <PlayPause />
      </div>
      <div
        className="nextBtn"
        onClick={() => {
          props.onNextClick();
          props.onNextCoverflow();
        }}
      >
        <NextTrack />
      </div>
      <div
        className="prevBtn"
        onClick={() => {
          props.onPrevClick();
          props.onPrevCoverflow();
        }}
      >
        <PrevTrack />
      </div>
      <div className="centerBtn" onClick={props.onCenterBtnClick}></div>
    </div>
  );
};

export default IpodWheel;
