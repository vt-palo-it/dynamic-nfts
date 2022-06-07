import React from "react";
import styled from "styled-components";
import { nameToImage } from "../../util/nameToImage";

const PreviewBadgeWrapper = styled.div`
  position: relative;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  height: 70%;
  border-radius: 5px;
`;

const PreviewBackground = styled.div`
  background-color: #5463b8;
  width: 100%;
  height: 30%;
`;

const PreviewDetail = styled.div`
  padding: 3rem 2rem;
`;

const PreviewImg = styled.img`
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 20%;
  height: 20%;
`;

export default function PreviewBadge({
  userToMintName,
  mintBadge = "experience001",
  userTitle,
  userDescription,
}) {

  return (
    <PreviewBadgeWrapper>
      <PreviewBackground />
      <PreviewImg
        src={`/assets/${nameToImage(mintBadge)}.png`}
        alt="Girl in a jacket"
        width="500"
        height="600"
      />
      <PreviewDetail>
        <h2>{userToMintName}</h2>
        <h4>{userTitle}</h4>
        <p>{userDescription}</p>
      </PreviewDetail>
    </PreviewBadgeWrapper>
  );
}
