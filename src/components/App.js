import React, { useEffect, useRef, useState } from "react";
import IpodWheel from "./IpodWheel";
import Screen from "./Screen";
import ZingTouch from "zingtouch";

//App component
function App() {
  const CurrentAngleRef = useRef(0);
  const prevSongAngleRef = useRef(0);
  const [currentSelected, setCurrentSelected] = useState("coverflow");
  const IPOD = "ipod";
  const COVERFLOW = "coverflow";
  const MUSIC = "music";
  const GAMES = "games";
  const SETTINGS = "settings";

  // state of Ipod App
  const [state, setState] = useState({
    visibleComponent: {
      displayHome: true,
      displayCoverflow: false,
      displayMusic: false,
      displayGames: false,
      displaySettings: false,
    },
    // Songs array
    songs: [],
    //albums array
    albums: [],
    isMusicPlaying: false,
    isMusicPlayerActive: false,
    activeCoverflow: 0,
    activeSongId: 0,
    pageTitle: IPOD,
  });

  // This function sets the selected state of an element in the list of elements
  const setSelectState = (selected) => {
    const elements = [COVERFLOW, MUSIC, GAMES, SETTINGS];
    elements.forEach((element) => {
      document.getElementById(element).classList = "option";
    });
    const selectedElement = document.getElementById(selected);
    // Add the "selected" class to the selected element
    selectedElement.classList.add("selected");
    // Set the current selected element
    setCurrentSelected(selected);
  };

  //   UseEffect hook to be executed when state.visibleComponent.displayHome,
  // state.visibleComponent.displayMusic, state.isMusicPlayerActive,
  // state.visibleComponent.displayCoverflow changes.
  useEffect(() => {
    const targetElement = document.getElementById("circle");
    const zingWheel = new ZingTouch.Region(targetElement);

    fetchData();
    fetchAlbumData();

    //Handle rotation of wheel and set the component based on angle
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
          //Check the distance between prevSongAngleRef and myAngle
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

    //Unbind rotate event when useEffect is unmounted
    return () => {
      zingWheel.unbind(targetElement, "rotate", handleRotation);
    };
  }, [
    state.visibleComponent.displayHome,
    state.visibleComponent.displayMusic,
    state.isMusicPlayerActive,
    state.visibleComponent.displayCoverflow,
  ]);

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

  // handleCenterBtnClick is a function that handles the click of a button in the center IpodWheel.
  const handleCenterBtnClick = (e) => {
    // preventDefault prevents the default behavior of the event from occurring
    e.preventDefault();

    // If displayHome is true, set visibility of other components and update pageTitle
    if (state.visibleComponent.displayHome) {
      let newState = {
        ...state,
        visibleComponent: { ...state.visibleComponent },
      };

      // switch statement to determine which component needs to be displayed
      switch (currentSelected) {
        case COVERFLOW:
          newState.visibleComponent.displayCoverflow = true;
          newState.pageTitle = setPageTitle(COVERFLOW);
          break;
        case MUSIC:
          newState.visibleComponent.displayMusic = true;
          newState.pageTitle = setPageTitle(MUSIC);
          break;
        case GAMES:
          newState.visibleComponent.displayGames = true;
          newState.pageTitle = setPageTitle(GAMES);
          break;
        case SETTINGS:
          newState.visibleComponent.displaySettings = true;
          newState.pageTitle = setPageTitle(SETTINGS);
          break;
        default:
          break;
      }

      // set displayHome to false
      newState.visibleComponent.displayHome = false;
      // update state with newState
      setState((prevState) => ({ ...prevState, ...newState }));
    } else if (state.visibleComponent.displayMusic) {
      // if MusicPlayer is not active then activate it or set it true
      if (!state.isMusicPlayerActive) {
        setState((prevState) => ({
          ...prevState,
          isMusicPlayerActive: true,
          isMusicPlaying: !prevState.isMusicPlaying,
        }));
      } else {
        // toggle isMusicPlaying
        setState((prevState) => ({
          ...prevState,
          isMusicPlaying: !prevState.isMusicPlaying,
        }));
      }
    }
  };

  //Hnadles Menu Button click
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
          isMusicPlaying: false,
        }));
        console.log(state.isMusicPlayerActive);
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

  //handles Play/Pause button click if Component visible is Music
  const handlePlayPauseClick = () => {
    if (state.visibleComponent.displayMusic && state.isMusicPlayerActive) {
      // Toggle playing status of music
      setState((prevState) => ({
        ...prevState,
        isMusicPlaying: !prevState.isMusicPlaying,
      }));
    }
  };

  //handles Next coverFlow selection if Component visible is Coverflow
  const handleNextCoverflow = () => {
    if (state.visibleComponent.displayCoverflow) {
      increaseActiveCoverflow();
    }
  };

  //handles Previous coverFlow selection if Component visible is Coverflow
  const handlePrevCoverflow = () => {
    if (state.visibleComponent.displayCoverflow) {
      decreaseActiveCoverflow();
    }
  };

  //handles Next Song selection if Component visible is Music
  const handleNextClick = () => {
    if (state.visibleComponent.displayMusic && state.isMusicPlayerActive) {
      // console.log("Next Clicked!!");
      increaseActiveSong();
    }
  };

  //handles Previous Song selection if Component visible is Music
  const handlePrevClick = () => {
    if (state.visibleComponent.displayMusic && state.isMusicPlayerActive) {
      // console.log("Prev Clicked!!");
      decreaseActiveSong();
    }
  };

  //Increase Coverlow selection value by 1
  const increaseActiveCoverflow = () => {
    setState((prevState) => {
      const activeId = prevState.activeCoverflow + 1;
      return {
        ...prevState,
        activeCoverflow: activeId > prevState.albums.length - 1 ? 0 : activeId,
      };
    });
  };

  //Decrease Coverlow selection value by 1
  const decreaseActiveCoverflow = () => {
    setState((prevState) => {
      const activeId = prevState.activeCoverflow - 1;
      return {
        ...prevState,
        activeCoverflow: activeId < 0 ? prevState.albums.length - 1 : activeId,
      };
    });
  };

  //Increase Song selection value by 1
  const increaseActiveSong = () => {
    setState((prevState) => {
      const songId = prevState.activeSongId + 1;
      return {
        ...prevState,
        activeSongId: songId > prevState.songs.length - 1 ? 0 : songId,
      };
    });
  };

  //Decrease Song selection value by 1
  const decreaseActiveSong = () => {
    setState((prevState) => {
      const songId = prevState.activeSongId - 1;
      return {
        ...prevState,
        activeSongId: songId < 0 ? prevState.songs.length - 1 : songId,
      };
    });
  };

  //Sets the pageTitle to capitalize value
  const setPageTitle = (input) => {
    const title = input.charAt(0).toUpperCase() + input.slice(1);
    return title;
  };

  return (
    <div className="Ipod">
      <img className="icon-image" src="favicon.ico" alt="icon" />
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
