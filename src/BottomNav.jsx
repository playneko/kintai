import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets/BottomNav.css";
import "./components/FontAwesome";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }} className="bottom-nav">
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/home');
              break;
            case 1:
              navigate('/kintai');
              break;
            case 2:
              navigate('/print');
              break;
            default:
              break;
          }
        }}
      >
        <BottomNavigationAction icon={<FontAwesomeIcon icon="home" />} />
        <BottomNavigationAction icon={<FontAwesomeIcon icon="calendar-days" />} />
        <BottomNavigationAction icon={<FontAwesomeIcon icon="upload" />} />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;