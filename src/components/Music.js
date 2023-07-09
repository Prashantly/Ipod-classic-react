import React, { useEffect, useState } from "react";

const MusicAlbums = (props) => {
  //   console.log(props.songId);
  let songs = props.songs;
  const [songSelected, setSongSelected] = useState(0);

  useEffect(() => {
    function selectSong() {
      setSongSelected(props.songId);
    }
    selectSong();
  }, [props.songId]);
  return (
    <div className="music-list">
      {songs.map((song, index) => (
        <div
          className={
            songSelected === index ? "song-card selected" : "song-card"
          }
          key={index}
        >
          <div className="left">
            <img src={song.cover28} alt="song-poster" />
          </div>
          <div className="right">
            <div className="song-singer">
              <b>Singer:</b>
              {song.singer}
            </div>
            <div className="song-title">
              <b>Song:</b>
              {song.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicAlbums;
