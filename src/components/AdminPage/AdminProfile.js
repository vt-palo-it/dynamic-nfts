import EditIcon from '@mui/icons-material/Edit';
import React,{ useEffect, useState } from "react";
import styled from "styled-components";

const AdminProfileInner = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
  font-family: 'Open Sans', sans-serif;
  background-color: #fcfcfc;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 4fr;
  align-items: center;
`;

const ProfileImg = styled.img`
  height: 200px;
  width: 200px;
`;

export const ProfileDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
`;

export const ProfileInnerDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  font-weight: 500;
`

export default function AdminProfile() {
  const [adminProfile,setAdminProfile] = useState({
    name: "",
    role: "",
    organisation: "",
    organisationLink: "",
    wallet: ""
  });

  const getData = () => {
    fetch('users.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then((response)=>{
        return response.json();
      })
      .then((myJson)=> {
        setAdminProfile(myJson[0])
      });
  }
  useEffect(()=>{
    getData()
  },[])

  return (
      <AdminProfileInner>
        <div></div>
        <ProfileImg />
        <ProfileDetails>
          <ProfileInnerDetail>
            <h3>{adminProfile?.name}</h3>
            <EditIcon style={{ color: '#5463B8' }}/>
          </ProfileInnerDetail>
          <ProfileInnerDetail>
            <Title>Role:</Title>
            <p>{adminProfile?.role}</p>
          </ProfileInnerDetail>
          <ProfileInnerDetail>
          <Title>User Wallet:</Title>
            <p>{adminProfile?.wallet.substring(0, 6)}...{adminProfile?.wallet.slice(-4)}</p>
          </ProfileInnerDetail>
          <ProfileInnerDetail>
          <Title>Organisation:</Title>
            <a href={adminProfile.organisationLink} target="_blank" rel="noreferrer">{adminProfile.organisation}</a>
          </ProfileInnerDetail>
        </ProfileDetails>
        <div></div>

      </AdminProfileInner>
  );
}
