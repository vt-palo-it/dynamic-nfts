import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';


import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const VisitorPage = () => {
    const [data,setData]=useState([]);
    const [badges,setBadges]=useState([]);
    const [value, setValue] = React.useState('1');

    const { wallet } = useParams();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const getData = () => {
        fetch('/users.json', {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(myJson) {
            for (let i = 0; i < myJson.length; i++) {
                if (myJson[i].wallet === wallet) {
                    setData(myJson[i]);
                    setBadges(myJson[i].badges)
                }
            }
        });
    }
    useEffect(()=>{
      getData()
    })

    return (
        <Box p={2} width="full">
            <Paper elevation={3}>
                <Stack direction='column' spacing={1} paddingLeft={5} paddingRight={5} paddingBottom={5}>
                <Fragment>
                    <h1>{data.name}</h1>
                    <Typography variant="body1">
                        <b>Wallet:</b> {data.wallet}<br/>
                        <b>Role:</b> {data.role}<br/>
                        <b>{data.tag}</b>
                    </Typography>
                    <Typography variant="body2" style={{whiteSpace: 'pre-line'}}>
                        {data.profile}
                    </Typography>
                    <Box sx={{ width: '100%', typography: 'body1' }} paddingTop={2}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Experience" value="1" />
                                <Tab label="Education" value="2" />
                                <Tab label="Achievements" value="3" />
                                <Tab label="Certification" value="4" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    {badges.map((item, key) => {
                                    if (item.metadata.attributes.type === 'experience') {
                                        let image = `/assets/${item.metadata.image}`
                                        return (
                                        <Grid item xs={3} p={1}>
                                            <Item sx={{ width: '100%', typography: 'body2' }} paddingTop={2}>
                                                <img src={image} alt="Logo"/><br/>
                                                {item.metadata.name}<br/>
                                                {item.metadata.description}
                                            </Item>
                                        </Grid>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                <Grid container spacing={2}>
                                    {badges.map((item, key) => {
                                    if (item.metadata.attributes.type === 'education') {
                                        let image = `/assets/${item.metadata.image}`
                                        return (
                                        <Grid item xs={3} p={1}>
                                        <Item sx={{ width: '100%', typography: 'body2' }} paddingTop={2}>
                                            <img src={image} alt="Logo"/><br/>
                                            {item.metadata.name}<br/>
                                            {item.metadata.description}
                                        </Item>
                                        </Grid>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3">
                                <Grid container spacing={2}>
                                    {badges.map((item, key) => {
                                    if (item.metadata.attributes.type === 'acievements') {
                                        let image = `/assets/${item.metadata.image}`
                                        return (
                                            <Grid item xs={3} p={1}>
                                                <Item sx={{ width: '100%', typography: 'body2' }} paddingTop={2}>
                                                    <img src={image} alt="Logo"/><br/>
                                                    {item.metadata.name}<br/>
                                                    {item.metadata.description}
                                                </Item>
                                            </Grid>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="4">
                                <Grid container spacing={2}>
                                    {badges.map((item, key) => {
                                
                                    if (item.metadata.attributes.type === 'certification') {
                                        let image = `/assets/${item.metadata.image}`
                                        return (
                                        <Grid item xs={3} p={1}>
                                            <Box sx={{ width: '100%', typography: 'body2' }} paddingTop={2}>
                                                <img src={image} alt="Logo"/><br/>
                                                {item.metadata.name}<br/>
                                                {item.metadata.description}
                                            </Box>
                                        </Grid>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Fragment>
                </Stack>
            </Paper>
      </Box>     
    )
}
export default VisitorPage;