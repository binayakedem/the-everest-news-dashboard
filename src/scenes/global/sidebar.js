import { useState,useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import AddBoxIcon from '@mui/icons-material/AddBox';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import UpdateIcon from '@mui/icons-material/Update';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { userContext } from "../../userContext/UserContext";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user} = useContext(userContext);
  console.log(user);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  The Everest News
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <NavLink to="/profile">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`https://t4.ftcdn.net/jpg/04/98/72/43/360_F_498724323_FonAy8LYYfD1BUC0bcK56aoYwuLHJ2Ge.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                  </NavLink>
              </Box>
              <Box textAlign="center">
               
               
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "1px 0 0 0" }}
                >
                Name: Janak Oli
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                Role:  Admin
                </Typography>
             
             
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
         

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >
              <hr></hr>
              Project
            </Typography>
            <Item
              title="Add Project"
              to="/add/project"
              icon={<AddBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit Project"
              to="/update/project"
              icon={<EditIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
           

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >
                       <hr></hr>

               English 
            </Typography>
            <Item
              title="Add English News"
              to="/add/english"
              icon={<AddBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit English News"
              to="/update/english"
              icon={<EditIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >
              <hr></hr>
              Photo
            </Typography>
            <Item
              title="Add Photo"
              to="/add/photo"
              icon={<AddPhotoAlternateIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit Photo"
              to="/update/photo"
              icon={<PhotoSizeSelectLargeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >
              <hr></hr>
               Videos
            </Typography>
            <Item
              title="Add Video"
              to="/add/video"
              icon={<YouTubeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit Video"
              to="/update/video"
              icon={<VideoCallIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >
               Tags
            </Typography>
            <Item
              title="Add Tags"
              to="/tags"
              icon={<LocalOfferIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 15px" }}
            >
              Category
            </Typography>
            <Item
              title="Add Category"
              to="/category"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >
              Author
            </Typography>
            <Item
              title="Add Author"
              to="/add/author"
              icon={<PersonAddAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit Author"
              to="/update/author"
              icon={<AssignmentIndIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 10px" }}
            >
               Advertisment
            </Typography>
            <Item
              title="Add Advertisment"
              to="/add/ads"
              icon={<AdsClickIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit Advertisment"
              to="/update/ads"
              icon={<UpdateIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >

             Live Score
            </Typography>
            <Item
              title="Football"
              to="/add/football"
              icon={<SportsSoccerIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Cricket"
              to="/add/cricket"
              icon={<SportsCricketIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 2px 10px" }}
            >
               Calendar
            </Typography>
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "1px 0 5px 20px" }}
            >
              

              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

         <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "12px 0 5px 20px" }}
            >
               Logout
            </Typography>
            <Item
              title="Logout"
              to="/logout"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;