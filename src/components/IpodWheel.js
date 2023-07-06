import React from "react";
import styled from "styled-components";
import Buttons from "./Buttons";

const Container = styled.div`
  position: relative;
  width: 290px;
  height: 224px;
  background-color: #dcdcdc;

  margin: auto;
`;

const Wheel = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 203px;
  background-color: #fff;
  box-shadow: 1px 5px 20px #555;
  border-radius: 50%;
  touch-action: none;
`;

const IpodWheel = () => {
  return (
    <Container>
      <Wheel>
        <Buttons />
      </Wheel>
      {/* <!-- Add other controls and buttons here --> */}
    </Container>
  );
};

export default IpodWheel;
