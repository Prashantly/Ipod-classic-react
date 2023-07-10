import React, { useEffect, useRef, useState } from "react";

const mod = (n, m) => {
  let result = n % m;
  return result >= 0 ? result : result + m;
};

const ImageCarousel = (props) => {
  const { albums, activeCoverflow } = props;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update the index
    timeoutRef.current = setTimeout(() => {
      setIndex(activeCoverflow);
    }, 300);

    // Clean up the timeout on unmount
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [activeCoverflow]);

  return (
    <div className="carousel">
      {albums.map((album, i) => {
        const indexLeft = mod(index - 1, albums.length);
        const indexRight = mod(index + 1, albums.length);
        let className = "";
        if (i === index) {
          className = "card card--active";
        } else if (i === indexRight) {
          className = "card card--right";
        } else if (i === indexLeft) {
          className = "card card--left";
        } else {
          className = "card";
        }
        return (
          <div key={i} className={className}>
            <img src={album.artworkURL} alt={i} />
          </div>
        );
      })}
    </div>
  );
};

export default ImageCarousel;
