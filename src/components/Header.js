import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { tokens } from "../theme";

const Header = ({ wish, gender, name, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ marginBottom: "5px" }}
      >
        {wish}   {icon}
      </Typography>
      
        
     
      <Typography variant="h3" color={colors.greenAccent[400]}>
        {gender}. {name}
      </Typography>
    </Box>
  );
};

export default Header;
