import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const Landing = () => {
    const [data, setData] = useState('');

    let navigate = useNavigate(); 

    const routeChange = () => { 
        let path = `/visitor/${data}`; 
        navigate(path);
    }

    return (
        <Box p={2} width="full" alignItems="center">
            <Paper elevation={3}>
                <Stack direction='column' spacing={5} padding={35}>
                    <img src="./assets/BlocSkillz.png" alt="Logo" width="100%"/>
                    <TextField name="wallet" value={data} label="Wallet Address" variant="outlined" onChange={e => setData(e.target.value)} />
                    <Button variant="contained" onClick={routeChange}>Search</Button>
                </Stack>
            </Paper>
        </Box>     
    )
}
export default Landing;