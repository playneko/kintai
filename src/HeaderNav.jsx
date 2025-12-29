import React from "react";
import "./assets/HeaderNav.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./components/FontAwesome";

const HeaderNav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" className="header-main">
          <FontAwesomeIcon icon="rocket" className="header-logo" />
          <Typography variant="h6" component="div">
            スマート勤怠
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderNav;