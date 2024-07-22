import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";
import Header from "../../components/Header"; // Assuming Header is imported from a separate file
import { 
  WbSunnyOutlined as MorningIcon,
  Brightness4Outlined as EveningIcon,
  WbSunnyOutlined as AfternoonIcon,
  NightlightOutlined as NightIcon
} from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Function to get current time and return a greeting and corresponding icon
  const getGreetingData = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return { greeting: "Good Morning", icon: <MorningIcon /> };
    } else if (currentTime >= 12 && currentTime < 18) {
      return { greeting: "Good Afternoon", icon: <AfternoonIcon /> };
    } else if (currentTime >= 18 && currentTime < 22) {
      return { greeting: "Good Evening", icon: <EveningIcon /> };
    } else {
      return { greeting: "Good Night", icon: <NightIcon /> };
    }
  };

  const { greeting, icon } = getGreetingData();

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header wish={greeting} icon={icon} gender="Mr" name="Janak" />
        

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ marginRight: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
