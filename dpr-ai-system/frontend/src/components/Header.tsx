import React, { useState } from 'react'; // Import useState
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu'; // Import Menu
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem

// Import MUI icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  drawerWidth: number;
}

function Header({ drawerWidth }: HeaderProps) {
  // State for anchoring the account menu
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
  const isAccountMenuOpen = Boolean(anchorElAccount);

  // State for anchoring the mail menu
  const [anchorElMail, setAnchorElMail] = useState<null | HTMLElement>(null);
  const isMailMenuOpen = Boolean(anchorElMail);

  // Handlers for Account Menu
  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorElAccount(null);
  };

  // Handlers for Mail Menu
  const handleMailMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMail(event.currentTarget);
  };
  const handleMailMenuClose = () => {
    setAnchorElMail(null);
  };

  // Menu IDs (useful for accessibility)
  const accountMenuId = 'primary-account-menu';
  const mailMenuId = 'primary-mail-menu';

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: '#ffffff',
        color: '#333'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} >
           <IconButton color="inherit">
             <SearchIcon />
           </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/* Mail Icon Button */}
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            aria-controls={mailMenuId} // Link button to menu
            aria-haspopup="true"
            onClick={handleMailMenuOpen} // Open mail menu on click
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          {/* Notifications Icon Button (no dropdown for now) */}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Account Icon Button */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={accountMenuId} // Link button to menu
            aria-haspopup="true"
            onClick={handleAccountMenuOpen} // Open account menu on click
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mail Dropdown Menu */}
      <Menu
        anchorEl={anchorElMail}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        id={mailMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMailMenuOpen}
        onClose={handleMailMenuClose}
      >
        {/* Add actual mail items later */}
        <MenuItem onClick={handleMailMenuClose}>Mail Item 1</MenuItem>
        <MenuItem onClick={handleMailMenuClose}>Mail Item 2</MenuItem>
      </Menu>

      {/* Account Dropdown Menu */}
      <Menu
        anchorEl={anchorElAccount}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position menu below icon
        id={accountMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }} // Animation origin
        open={isAccountMenuOpen}
        onClose={handleAccountMenuClose} // Close menu when clicking away
      >
        <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>Logout</MenuItem>
      </Menu>

    </AppBar>
  );
}

export default Header;