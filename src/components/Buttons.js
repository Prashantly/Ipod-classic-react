import React from "react";
import { styled } from "styled-components";
import { PlayPause, NextTrack, PrevTrack, Menu } from "../icons";

const ButtonsContainer = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
`;

const MenuBtn = styled.div`
  position: absolute;
  top: 12%;
  left: 38%;
  user-select: none;
  touch-action: none;
`;
const PlayPauseBtn = styled.div`
  position: absolute;
  bottom: 6%;
  left: 42%;
  user-select: none;
  touch-action: none;
`;
const NextBtn = styled.div`
  position: absolute;
  top: 45%;
  right: 5%;
  user-select: none;
  touch-action: none;
`;
const PrevBtn = styled.div`
  position: absolute;
  top: 45%;
  left: 5%;
  user-select: none;
  touch-action: none;
`;

const CnterBtn = styled.div`
  position: absolute;
  width: 55px;
  height: 55px;
  background-color: #dcdcdc;
  border-radius: 50%;
  box-shadow: inset 0 0 2.4em rgb(187, 181, 181);
  top: 37%;
  left: 36%;
`;

const Buttons = () => {
  return (
    <ButtonsContainer>
      <MenuBtn>
        <Menu />
      </MenuBtn>
      <PlayPauseBtn>
        <PlayPause />
      </PlayPauseBtn>
      <NextBtn>
        <NextTrack />
      </NextBtn>
      <PrevBtn>
        <PrevTrack />
      </PrevBtn>
      <CnterBtn></CnterBtn>
    </ButtonsContainer>
  );
};

export default Buttons;
