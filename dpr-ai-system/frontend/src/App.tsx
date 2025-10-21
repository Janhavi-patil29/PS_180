import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

// Import placeholder components (we will create/update these next)
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Upload from './components/Upload';

// Define sidebar width
const drawerWidth = 240;

function App() {
  return (
    <Router>
      {/* Main container Box */}
      <Box sx={{ display: 'flex' }}>
        {/* Apply baseline CSS styles */}
        <CssBaseline />

        {/* Header Component (AppBar) - Placeholder */}
        {/* We will pass the drawerWidth to AppBar later */}
        <Header drawerWidth={drawerWidth} />

        {/* Sidebar Component (Drawer) - Placeholder */}
        {/* We will pass the drawerWidth to Drawer later */}
        <Sidebar drawerWidth={drawerWidth} />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1, // Takes remaining space
            p: 3, // Padding
            width: { sm: `calc(100% - ${drawerWidth}px)` }, // Adjust width for sidebar
            marginTop: '64px' // Offset content below AppBar (default MUI height)
          }}
        >
          {/* Define application routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            {/* Add other routes here later (e.g., Projects, Users) */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;