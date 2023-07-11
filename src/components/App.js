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
    albums: [],
    isMusicPlaying: false,
    isMusicPlayerActive: false,
    activeCoverflow: 0,
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
    fetchAlbumData();

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
    state.visibleComponent.displayCoverflow,
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

  // Make API CALL "Reading data from local stored albumData.json"
  const fetchAlbumData = async () => {
    const response = await fetch("albumData.json");
    const data = await response.json();
    // console.log(data.results);
    let albumsArray = [];
    data.results.forEach((album) => {
      albumsArray.push({
        albumId: album.id,
        albumName: album.name,
        artistName: album.artistName,
        artworkURL: album.artworkUrl100,
        albumURL: album.url,
      });
    });
    setState((prevState) => ({
      ...prevState,
      albums: albumsArray.slice(0, 10),
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
          pageTitle: setPageTitle(COVERFLOW),
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
          pageTitle: setPageTitle(MUSIC),
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
          pageTitle: setPageTitle(GAMES),
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
          pageTitle: setPageTitle(SETTINGS),
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
        pageTitle: setPageTitle(IPOD),
      }));
      // setCurrentSelected(COVERFLOW);
    } else if (state.visibleComponent.displayMusic) {
      console.log(state.isMusicPlayerActive);
      if (state.isMusicPlayerActive) {
        setState((prevState) => ({
          ...prevState,
          isMusicPlayerActive: false,
          isMusicPlaying: !prevState.isMusicPlaying,
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
          pageTitle: setPageTitle(IPOD),
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
        pageTitle: setPageTitle(IPOD),
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
        pageTitle: setPageTitle(IPOD),
      }));

      setCurrentSelected(COVERFLOW);
    }
  };

  const handlePlayPauseClick = () => {
    if (state.visibleComponent.displayMusic && state.isMusicPlayerActive) {
      // console.log("Pause Clicked!!");
      setState((prevState) => ({
        ...prevState,
        isMusicPlaying: !prevState.isMusicPlaying,
      }));
    }
  };

  const handleNextCoverflow = () => {
    if (state.visibleComponent.displayCoverflow) {
      increaseActiveCoverflow();
    }
  };

  const handlePrevCoverflow = () => {
    if (state.visibleComponent.displayCoverflow) {
      decreaseActiveCoverflow();
    }
  };

  const handleNextClick = () => {
    if (state.visibleComponent.displayMusic && state.isMusicPlayerActive) {
      // console.log("Next Clicked!!");
      increaseActiveSong();
    }
  };

  const handlePrevClick = () => {
    if (state.visibleComponent.displayMusic && state.isMusicPlayerActive) {
      // console.log("Prev Clicked!!");
      decreaseActiveSong();
    }
  };

  const increaseActiveCoverflow = () => {
    setState((prevState) => {
      const activeId = prevState.activeCoverflow + 1;
      return {
        ...prevState,
        activeCoverflow: activeId > prevState.albums.length - 1 ? 0 : activeId,
      };
    });
  };

  const decreaseActiveCoverflow = () => {
    setState((prevState) => {
      const activeId = prevState.activeCoverflow - 1;
      return {
        ...prevState,
        activeCoverflow: activeId < 0 ? prevState.albums.length - 1 : activeId,
      };
    });
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

  const setPageTitle = (input) => {
    const title = input.charAt(0).toUpperCase() + input.slice(1);
    return title;
  };

  return (
    <div className="Ipod">
      <Screen currentState={state} />
      <IpodWheel
        onCenterBtnClick={handleCenterBtnClick}
        onMenuBtnClick={handleMenuBtnClick}
        onPlayPauseClick={handlePlayPauseClick}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onPrevCoverflow={handlePrevCoverflow}
        onNextCoverflow={handleNextCoverflow}
      />
    </div>
  );
}

export default App;
