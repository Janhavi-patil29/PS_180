import React from 'react';
// Import NavLink instead of Link for active state styling
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Import MUI icons (same as before)
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';

interface SidebarProps {
  drawerWidth: number;
}

function Sidebar({ drawerWidth }: SidebarProps) {

  // Define style for active NavLink
  const activeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Example active background
    color: '#fff', // Example active text color
    fontWeight: 'bold',
  };

  // Define the content of the drawer
  const drawerContent = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#263043', color: '#fff' }}>
         <StorageIcon sx={{ mr: 1, fontSize: '2rem' }} />
         <Typography variant="h6" noWrap component="div">
            DPR AI System
         </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/> {/* Added Divider styling */}
      <List>
        {/* Navigation items using NavLink */}
        {[
          { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#9e9ea4' }} />, path: '/' },
          { text: 'Projects', icon: <FolderIcon sx={{ color: '#9e9ea4' }} />, path: '/projects' }, // Update path later
          { text: 'Upload DPR', icon: <UploadFileIcon sx={{ color: '#9e9ea4' }} />, path: '/upload' },
          { text: 'Users', icon: <PeopleIcon sx={{ color: '#9e9ea4' }} />, path: '/users' },       // Update path later
          { text: 'Settings', icon: <SettingsIcon sx={{ color: '#9e9ea4' }} />, path: '/settings' },   // Update path later
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            {/* Use NavLink with the style prop */}
            <ListItemButton
              component={NavLink}
              to={item.path}
              style={({ isActive }) => ({ // Style prop receives isActive status
                ...(isActive ? activeStyle : {}), // Apply activeStyle if isActive is true
                textDecoration: 'none', // Remove underline from link
                color: '#9e9ea4', // Default text color
              })}
              sx={{ // MUI sx prop for hover effects etc.
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}> {/* Adjust icon spacing */}
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Temporary Drawer for mobile (unchanged) */}
      <Drawer
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#263043' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent Drawer for desktop (unchanged) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#263043' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;