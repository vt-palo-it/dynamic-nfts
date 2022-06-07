import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Title } from "./AdminProfile";
import MintUser from "./MintUser";
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function SearchProfile() {
  const [users, setUsers] = useState([]);
  const [userToMint, setUserToMint] = useState(undefined);

  const getData = () => {
    fetch("users.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setUsers(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SearchWrapper>
      <Title>To certify a person, search for their user ID</Title>
      <Autocomplete
        style={{ width: "50%" }}
        id="free-solo-demo"
        onChange={(event, newValue) => {
          setUserToMint(users.find((user) => user.name === newValue));
        }}
        freeSolo
        options={users?.map((option) => option?.name)}
        renderInput={(params) => (
          <TextField {...params} label="Search Profile" />
        )}
      />
      {userToMint && <MintUser userToMint={userToMint} />}
    </SearchWrapper>
  );
}
