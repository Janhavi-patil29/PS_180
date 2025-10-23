import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Upload from './components/Upload';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/mountain-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)',
          opacity: 0.3,
          zIndex: -2,
        }
       }}>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} />

        {/* --- Main Content Box --- */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3, // Padding
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: '64px', // Offset below AppBar
            backgroundColor: 'rgba(112, 124, 143, 0.6)', // Subtle dark background overlay
            borderRadius: { sm: '8px 0 0 0' } // Optional rounded corner
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Box>
        {/* --- END Main Content Box --- */}

      </Box>
    </Router>
  );
}

export default App;