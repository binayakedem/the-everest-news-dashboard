import React, { useState } from 'react';
import { Box, IconButton, useTheme, Tooltip } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from "@mui/icons-material/Search";
import Register from '../../Authentication/Register';
import { NavLink } from 'react-router-dom';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [toggle,setToggle]=useState(false);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <Tooltip title="Toggle Light/Dark Mode">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Go to The Everest News Facebook page">
          <IconButton
            component="a"
            href="https://www.facebook.com/people/The-Everest-News/61557594452068/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlinedIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Notifications">
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Settings">
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Account">
          <IconButton >
            <NavLink to="/profile">
              <AccountCircleIcon />
              </NavLink> 
          </IconButton>
        </Tooltip>
        {
          toggle?
          <Register/>:''
        }
      </Box>
    </Box>
  );
};

export default Topbar;
