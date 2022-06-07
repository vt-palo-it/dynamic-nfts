import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import AdminPage from './components/AdminPage/';
import VisitorPage from './components/VisitorPage/';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    secondary: {
      main: '#5463b8',
    },
  },
});

const App = () => { 
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/visitor/:wallet' element={<VisitorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
)};

export default App;
