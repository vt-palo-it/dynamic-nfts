import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { ProfileDetails, ProfileInnerDetail } from "./AdminProfile";
const MintUserWrapper = styled.div`
  width: 80%;
  justify-content: space-around;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 4fr 4fr 1fr;
  gap: 2rem;
`;

const CertDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CertPreview = styled.div`
  display: flex;
`;

const H2Title = styled.h2`
  font-weight: 500;
`;

export default function MintUser({ userToMint }) {
  const [badges, setBadges] = useState(undefined);
  const [mintBadge, setMintBadge] = useState(undefined);
  const [userTitle, setUserTitle] = useState(undefined);
  const [userDescription, setUserDescription] = useState(undefined);
  const getData = () => {
    fetch("badges.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setBadges(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <MintUserWrapper>
      <div></div>
      <CertDetails>
        <H2Title>Certificatio details</H2Title>
        <h4>{userToMint.name}</h4>
        <ProfileDetails>
          <ProfileInnerDetail>
            <p>Role:</p>
            <p>{userToMint?.role}</p>
          </ProfileInnerDetail>
          <ProfileInnerDetail>
            <p>User ID:</p>
            <p>{userToMint?.id}</p>
          </ProfileInnerDetail>
          <Autocomplete
            style={{ width: "100%", paddingTop: "1rem" }}
            disablePortal
            onChange={(event, newValue) => {
              setMintBadge(newValue);
            }}
            id="combo-box-demo"
            options={badges?.experience.map((option) => option.name)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Badges" />}
          />
          <TextField
            style={{ width: "100%", marginTop: "3rem" }}
            onChange={(e) => setUserTitle(e.target.value)}
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          {userTitle}

          <TextField
            placeholder="Description"
            style={{ width: "100%", marginTop: "3rem" }}
            onChange={(e) => setUserDescription(e.target.value)}
            multiline
            rows={10}
          />
        </ProfileDetails>
      </CertDetails>
      <CertPreview>
        <h3>Preview</h3>
      </CertPreview>
      <div></div>
    </MintUserWrapper>
  );
}
