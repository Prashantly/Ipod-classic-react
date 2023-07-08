import React, { useEffect, useRef, useState } from "react";
import IpodWheel from "./IpodWheel";
import Screen from "./Screen";
import ZingTouch from "zingtouch";

function App() {
  const CurrentAngleRef = useRef(0);
  const [currentSelected, setCurrentSelected] = useState(null);
  const COVERFLOW = "coverflow";
  const MUSIC = "music";
  const GAMES = "games";
  const SETTINGS = "settings";

  const [state, setState] = useState({
    visibleComponent: {
      displayHome: true,
      displayCoverflow: false,
      displayMusic: false,
      displayGames: false,
      displaySettings: false,
      displayAbout: false,
    },
  });

  const setSelectState = (selected) => {
    const coverflow = document.getElementById(COVERFLOW);
    const music = document.getElementById(MUSIC);
    const games = document.getElementById(GAMES);
    const settings = document.getElementById(SETTINGS);

    coverflow.classList =
      music.classList =
      games.classList =
      settings.classList =
        "option";

    const selectedElement = document.getElementById(selected);
    selectedElement.classList.add("selected");
    setCurrentSelected(selected);
  };

  const handleRotation = (e) => {
    CurrentAngleRef.current =
      CurrentAngleRef.current + e.detail.distanceFromLast;
    const myAngle = Math.round(CurrentAngleRef.current % 360);

    if (state.visibleComponent.displayHome) {
      if (myAngle < 90 && myAngle >= 0) {
        setSelectState(COVERFLOW);
      } else if (myAngle < 180 && myAngle >= 90) {
        setSelectState(MUSIC);
      } else if (myAngle < 270 && myAngle >= 180) {
        setSelectState(GAMES);
      } else if (myAngle < 360 && myAngle >= 270) {
        setSelectState(SETTINGS);
      }
    }
  };

  //useEffect
  useEffect(() => {
    const targetElement = document.getElementById("circle");
    const zingWheel = new ZingTouch.Region(targetElement);
    zingWheel.bind(targetElement, "rotate", handleRotation);

    return () => {
      zingWheel.unbind(targetElement, "rotate", handleRotation);
    };
  }, []);

  return (
    <div className="Ipod">
      <Screen />
      <IpodWheel />
    </div>
  );
}

export default App;
