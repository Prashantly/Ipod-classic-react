import React, { useEffect, useRef } from "react";
import Buttons from "./Buttons";
import ZingTouch from "zingtouch";

const IpodWheel = () => {
  const wheelRef = useRef(null);
  useEffect(() => {
    const wheelElement = wheelRef.current;
    console.log(wheelElement);
    const zingTouch = new ZingTouch.Region(wheelElement);

    // zingTouch.bind(wheelElement, "rotate", function (e) {
    //   console.log("Rotate gesture emitted: " + e.detail.interval);
    // });
  }, []);
  return (
    <div className="wheel-container">
      <div ref={wheelRef} id="circle">
        <Buttons />
      </div>
    </div>
  );
};

export default IpodWheel;
