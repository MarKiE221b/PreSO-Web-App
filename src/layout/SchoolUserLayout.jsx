import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";

import preSOLogo from "../assets/preSo_logo.png";

import { MdDashboard } from "react-icons/md";
import { IoIosMail, IoMdMenu, IoIosLogOut } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";

import { Link, Outlet, useLocation } from "react-router-dom";

const NavItem = ({ item, index }) => {
  const location = useLocation();

  const isActive = location.pathname === item.path;

  return (
    <ListItem
      button
      component={Link}
      to={item.path}
      className={`hover:bg-gray-200 ${isActive ? "bg-gray-300" : ""}`}
    >
      <ListItemIcon>
        {index % 2 === 0 ? <MdDashboard /> : <FaFileUpload />}
      </ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  );
};

const DynamicTypography = () => {
  const location = useLocation();

  let title = "Dashboard";

  switch (location.pathname) {
    case "/school/123/dashboard":
      title = "Dashboard";
      break;
    case "/school/123/submit":
      title = "SO Submission";
      break;
    default:
      title = "Dashboard";
  }

  return (
    <Typography variant="body1" noWrap>
      {title}
    </Typography>
  );
};

const SchoolUserLayout = () => {
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Dashboard", path: "/school/123/Dashboard" },
    { text: "SO Submission", path: "/school/123/submit" },
  ];

  const drawer = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center h-20 bg-white text-black">
        <img src={preSOLogo} alt="PreSO Logo" className="h-16 mr-2" />
        <Typography variant="h6" component="div" noWrap>
          PreSO
        </Typography>
      </div>

      <div className="flex-1">
        <List>
          {navItems.map((item, index) => (
            <NavItem key={item.text} item={item} index={index} />
          ))}
        </List>
      </div>

      <div className="p-4">
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<IoIosLogOut />}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* AppBar */}
      <AppBar
        position="fixed"
        className="ml-60"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: `rgba(2,80,139,255)`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <IoMdMenu />
          </IconButton>
          <DynamicTypography />
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Box component="nav" className="sm:hidden">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        className="flex-1 p-6 bg-gray-100 overflow-auto"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </div>
  );
};

export default SchoolUserLayout;
