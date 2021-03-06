import React from 'react'

import AdminProfile from './AdminProfile'
import MintUser from './MintUser'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function AdminPage() {
  return (
    <Box p={2} width="full">
      <Paper elevation={3}>
        <Stack direction='column' spacing={1} paddingLeft={5} paddingRight={5} paddingBottom={5}>
          <AdminProfile/>
          <MintUser/>
        </Stack>
      </Paper>
    </Box>   
  )
}
