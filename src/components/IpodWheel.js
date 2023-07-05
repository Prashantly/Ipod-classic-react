import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #dcdcdc;
  margin: auto;
`;

const Wheel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 203px;
  background-color: #fff;
  border-radius: 50%;
`;

const IpodWheel = () => {
  return (
    <Container>
      <Wheel></Wheel>
      {/* <!-- Add other controls and buttons here --> */}
    </Container>
  );
};

export default IpodWheel;
