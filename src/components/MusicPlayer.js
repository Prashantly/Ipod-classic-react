import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const MusicPlayer = (props) => {
  const { song, songId, isMusicPlaying } = props;
  const [songPlaying, setSongPlaying] = useState(true);

  useEffect(() => {
    setSongPlaying(isMusicPlaying);
  }, [isMusicPlaying]);
  return (
    <div
      className="player-wrapper"
      style={{ backgroundImage: `url(${song.cover})` }}
    >
      <ReactPlayer
        className="react-player"
        key={songId}
        url={song.musicSrc}
        playing={songPlaying}
        controls={false}
        light={false}
        height="20%"
        width="100%"
        onReady={() => {
          setSongPlaying(isMusicPlaying);
        }}
      />
    </div>
  );
};

export default MusicPlayer;
