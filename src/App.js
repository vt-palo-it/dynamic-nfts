import blue from '@mui/material/colors/blue';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminPage from './components/AdminPage/';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import VisitorPage from './components/VisitorPage';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: blue
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
            <Route path='/visitor' element={<VisitorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
)};

export default App;
