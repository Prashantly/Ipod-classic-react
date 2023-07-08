import React from "react";

const Screen = ({ currentSelected, setCurrentSelected }) => {
  return (
    <div className="screen">
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
