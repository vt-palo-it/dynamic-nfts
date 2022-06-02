import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import AdminPage from './components/AdminPage';
import VisitorPage from './components/VisitorPage';

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
