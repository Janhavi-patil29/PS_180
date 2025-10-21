import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Use alias to avoid conflict
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

// Import MUI icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage'; // Example icon for brand

// Define props interface
interface SidebarProps {
  drawerWidth: number;
  // Add props for mobile drawer state and toggle handler later
  // mobileOpen?: boolean;
  // handleDrawerToggle?: () => void;
}

function Sidebar({ drawerWidth }: SidebarProps) {

  // Define the content of the drawer
  const drawerContent = (
    <div>
      {/* Toolbar adds spacing equivalent to the AppBar height */}
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#263043', color: '#fff' }}>
         <StorageIcon sx={{ mr: 1, fontSize: '2rem' }} /> {/* Brand Icon */}
         <Typography variant="h6" noWrap component="div">
            DPR AI System
         </Typography>
      </Toolbar>
      <Divider />
      <List>
        {/* Dashboard Link */}
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/">
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#9e9ea4' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#9e9ea4' }}/>
          </ListItemButton>
        </ListItem>

        {/* Projects Link (placeholder) */}
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/projects"> {/* Update path later */}
            <ListItemIcon>
              <FolderIcon sx={{ color: '#9e9ea4' }} />
            </ListItemIcon>
            <ListItemText primary="Projects" sx={{ color: '#9e9ea4' }}/>
          </ListItemButton>
        </ListItem>

        {/* Upload DPR Link */}
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/upload">
            <ListItemIcon>
              <UploadFileIcon sx={{ color: '#9e9ea4' }} />
            </ListItemIcon>
            <ListItemText primary="Upload DPR" sx={{ color: '#9e9ea4' }}/>
          </ListItemButton>
        </ListItem>

         {/* Users Link (placeholder) */}
         <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/users"> {/* Update path later */}
            <ListItemIcon>
              <PeopleIcon sx={{ color: '#9e9ea4' }} />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ color: '#9e9ea4' }}/>
          </ListItemButton>
        </ListItem>

         {/* Settings Link (placeholder) */}
         <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/settings"> {/* Update path later */}
            <ListItemIcon>
              <SettingsIcon sx={{ color: '#9e9ea4' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: '#9e9ea4' }}/>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Temporary Drawer for mobile (hidden for now, functionality later) */}
      <Drawer
        variant="temporary"
        // open={mobileOpen} // Control with state later
        // onClose={handleDrawerToggle} // Add later
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }, // Show only on extra-small screens
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#263043' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent Drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }, // Hide on extra-small, show on small+
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#263043' },
        }}
        open // Permanent drawer is always open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;