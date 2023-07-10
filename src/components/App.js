import React, { useEffect, useRef, useState } from "react";
import IpodWheel from "./IpodWheel";
import Screen from "./Screen";
import ZingTouch from "zingtouch";

function App() {
  const CurrentAngleRef = useRef(0);
  const prevSongAngleRef = useRef(0);
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
    songs: [],
    isMusicPlaying: false,
    isMusicPlayerActive: false,
    activeSongId: 0,
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

    fetchData();

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
      } else if (
        state.visibleComponent.displayMusic &&
        !state.isMusicPlayerActive
      ) {
        if (Math.abs(prevSongAngleRef.current - myAngle) >= 50) {
          // console.log(prevSongAngleRef.current);
          // console.log(myAngle);
          // console.log(Math.abs(prevSongAngleRef.current - myAngle));
          if (e.detail.distanceFromLast > 0) {
            increaseActiveSong();
          } else {
            decreaseActiveSong();
          }

          prevSongAngleRef.current = myAngle;
        }
      }
    };
    zingWheel.bind(targetElement, "rotate", handleRotation, {
      draggable: false,
    });

    return () => {
      zingWheel.unbind(targetElement, "rotate", handleRotation);
    };
  }, [
    state.visibleComponent.displayHome,
    state.visibleComponent.displayMusic,
    state.isMusicPlayerActive,
  ]);

  // useEffect(() => {
  //   console.log(state);
  //   console.log(state.activeSongId);
  // }, [state, currentSelected]);

  // Make API CALL "Reading data from local stored musicList.json"
  const fetchData = async () => {
    const response = await fetch("musicList.json");
    const data = await response.json();
    setState((prevState) => ({
      ...prevState,
      songs: data.songs,
    }));
  };

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
    } else if (state.visibleComponent.displayMusic) {
      if (!state.isMusicPlayerActive) {
        //if MusicPlayer is not active then activate it or set it true
        setState((prevState) => ({
          ...prevState,
          isMusicPlayerActive: true,
          isMusicPlaying: !prevState.isMusicPlaying,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          isMusicPlaying: !prevState.isMusicPlaying,
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
      setState((prevState) => ({
        ...prevState,
        visibleComponent: {
          ...prevState.visibleComponent,
          displayHome: !prevState.visibleComponent.displayHome,
          displayCoverflow: !prevState.visibleComponent.displayCoverflow,
        },
        pageTitle: IPOD,
      }));
      // setCurrentSelected(COVERFLOW);
    } else if (state.visibleComponent.displayMusic) {
      console.log(state.isMusicPlayerActive);
      if (state.isMusicPlayerActive) {
        setState((prevState) => ({
          ...prevState,
          isMusicPlayerActive: false,
        }));
      } else {
        console.log("Music Clicked!!");
        setState((prevState) => ({
          ...prevState,
          visibleComponent: {
            ...prevState.visibleComponent,
            displayHome: !prevState.visibleComponent.displayHome,
            displayMusic: !prevState.visibleComponent.displayMusic,
          },
          pageTitle: IPOD,
        }));
        setCurrentSelected(COVERFLOW);
      }
    } else if (state.visibleComponent.displayGames) {
      console.log("Games Clicked!!");
      setState((prevState) => ({
        ...prevState,
        visibleComponent: {
          ...prevState.visibleComponent,
          displayHome: !prevState.visibleComponent.displayHome,
          displayGames: !prevState.visibleComponent.displayGames,
        },
        pageTitle: IPOD,
      }));
      setCurrentSelected(COVERFLOW);
    } else if (state.visibleComponent.displaySettings) {
      console.log("Settings Clicked!!");
      setState((prevState) => ({
        ...prevState,
        visibleComponent: {
          ...prevState.visibleComponent,
          displayHome: !prevState.visibleComponent.displayHome,
          displaySettings: !prevState.visibleComponent.displaySettings,
        },
        pageTitle: IPOD,
      }));

      setCurrentSelected(COVERFLOW);
    }
  };

  const increaseActiveSong = () => {
    setState((prevState) => {
      const songId = prevState.activeSongId + 1;
      return {
        ...prevState,
        activeSongId: songId > prevState.songs.length - 1 ? 0 : songId,
      };
    });
  };
  const decreaseActiveSong = () => {
    setState((prevState) => {
      const songId = prevState.activeSongId - 1;
      return {
        ...prevState,
        activeSongId: songId < 0 ? prevState.songs.length - 1 : songId,
      };
    });
  };

  return (
    <div className="Ipod">
      <Screen currentState={state} />
      <IpodWheel
        onCenterBtnClick={handleCenterBtnClick}
        onMenuBtnClick={handleMenuBtnClick}
      />
    </div>
  );
}

export default App;
