import React, { useState ,useContext, useEffect} from "react";
import { userContext } from "./userContext/UserContext";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Tags from "./scenes/TagsAndCategory/Tags";
import Photo from "./scenes/PhotoAndVideo/Photo";
import PhotoList from "./scenes/PhotoAndVideo/PhotoList";
import Video from "./scenes/PhotoAndVideo/Video";
import Category from "./scenes/TagsAndCategory/Category";
import Project from "./scenes/Project/Project";
import { UserContextProvider } from "./userContext/UserContext";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Profile from "./Authentication/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
function App() {
  const [theme, colorMode] = useMode();
  const{user}=useContext(userContext)
  const[isAuthenticated,setIsAuthenticated]=useState(false)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <UserContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar/>
            <Routes>

            <Route 
          path="/" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          } 
        />
                <Route path="/tags" element={<Tags />} />
                <Route path="/add/photo" element={<Photo />} />
                <Route path="/update/photo" element={<PhotoList />} />
                <Route path="/category" element={<Category />} />
                <Route path="/add/project" element={<Project />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="profile" element={<Profile/>}/>


                

                {/* add more routes here */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      </UserContextProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
