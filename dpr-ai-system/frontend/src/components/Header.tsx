import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge'; // For notification count

// Import MUI icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Define props interface if needed (we'll use drawerWidth here)
interface HeaderProps {
  drawerWidth: number;
  // Add a function prop for handling sidebar toggle later
  // handleDrawerToggle?: () => void;
}

function Header({ drawerWidth }: HeaderProps) {
  return (
    <AppBar
      position="fixed" // Keeps header fixed at the top
      sx={{
        // Adjust width and margin based on sidebar width for larger screens
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: '#ffffff', // White background like the example
        color: '#333' // Darker text color for contrast
      }}
    >
      <Toolbar>
        {/* Menu Icon (for mobile sidebar toggle - functionality later) */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          // onClick={handleDrawerToggle} // Add this later for functionality
          sx={{ mr: 2, display: { sm: 'none' } }} // Only display on small screens
        >
          <MenuIcon />
        </IconButton>

        {/* Optional Title or Search Bar */}
        {/* For now, just a placeholder or keep it minimal */}
        <Box sx={{ flexGrow: 1 }} > {/* This Box pushes icons to the right */}
           <IconButton color="inherit">
             <SearchIcon />
           </IconButton>
        </Box>


        {/* Right side icons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}> {/* Hide on extra small, show on medium+ */}
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId} // Add later for profile menu
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen} // Add later for functionality
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
         {/* Add mobile menu icon/handler later if needed */}

      </Toolbar>
    </AppBar>
  );
}

export default Header;