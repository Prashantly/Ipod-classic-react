import React, { useEffect, useRef, useState } from "react";
import IpodWheel from "./IpodWheel";
import Screen from "./Screen";
import ZingTouch from "zingtouch";

function App() {
  const CurrentAngleRef = useRef(0);
  const [currentSelected, setCurrentSelected] = useState("coverflow");
  const IPOD = "ipod";
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
    },
    pageTitle: IPOD,
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

  //useEffect
  useEffect(() => {
    const targetElement = document.getElementById("circle");
    const zingWheel = new ZingTouch.Region(targetElement);

    const handleRotation = (e) => {
      CurrentAngleRef.current =
        CurrentAngleRef.current + e.detail.distanceFromLast;
      const myAngle = Math.round(CurrentAngleRef.current % 360);

      if (state.visibleComponent.displayHome) {
        if ((myAngle < 90 && myAngle >= 0) || (myAngle <= 0 && myAngle > -90)) {
          setSelectState(COVERFLOW);
        } else if (
          (myAngle < 180 && myAngle >= 90) ||
          (myAngle <= -90 && myAngle > -180)
        ) {
          setSelectState(MUSIC);
        } else if (
          (myAngle < 270 && myAngle >= 180) ||
          (myAngle <= -180 && myAngle > -270)
        ) {
          setSelectState(GAMES);
        } else if (
          (myAngle <= 360 && myAngle >= 270) ||
          (myAngle <= -270 && myAngle > -360)
        ) {
          setSelectState(SETTINGS);
        }
      }
    };
    zingWheel.bind(targetElement, "rotate", handleRotation, {
      draggable: false,
    });

    return () => {
      zingWheel.unbind(targetElement, "rotate", handleRotation);
    };
  }, [state.visibleComponent.displayHome]);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const handleCenterBtnClick = (e) => {
    e.preventDefault();

    if (state.visibleComponent.displayHome) {
      if (currentSelected === COVERFLOW) {
        setState((prevState) => ({
          ...prevState,
          visibleComponent: {
            ...prevState.visibleComponent,
            displayHome: false,
            displayCoverflow: true,
          },
          pageTitle: COVERFLOW,
        }));
      } else if (currentSelected === MUSIC) {
        setState((prevState) => ({
          ...prevState,
          visibleComponent: {
            ...prevState.visibleComponent,
            displayHome: false,
            displayCoverflow: false,
            displayMusic: true,
            displayGames: false,
            displaySettings: false,
          },
          pageTitle: MUSIC,
        }));
      } else if (currentSelected === GAMES) {
        setState((prevState) => ({
          ...prevState,
          visibleComponent: {
            ...prevState.visibleComponent,
            displayHome: false,
            displayCoverflow: false,
            displayMusic: false,
            displayGames: true,
            displaySettings: false,
          },
          pageTitle: GAMES,
        }));
      } else if (currentSelected === SETTINGS) {
        setState((prevState) => ({
          ...prevState,
          visibleComponent: {
            ...prevState.visibleComponent,
            displayHome: false,
            displayCoverflow: false,
            displayMusic: false,
            displayGames: false,
            displaySettings: true,
          },
          pageTitle: SETTINGS,
        }));
      }
    }
  };

  const handleMenuBtnClick = () => {
    if (state.visibleComponent.displayHome) {
      console.log("Menu clicked!!");
      return;
    } else if (state.visibleComponent.displayCoverflow) {
      console.log("COVER FLOW Clicked!!");
    } else if (state.visibleComponent.displayMusic) {
      console.log("Music Clicked!!");
    } else if (state.visibleComponent.displayGames) {
      console.log("Games Clicked!!");
    } else if (state.visibleComponent.displaySettings) {
      console.log("Settings Clicked!!");
    }
  };

  return (
    <div className="Ipod">
      <Screen />
      <IpodWheel
        onCenterBtnClick={handleCenterBtnClick}
        onMenuBtnClick={handleMenuBtnClick}
      />
    </div>
  );
}

export default App;
