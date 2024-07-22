import React, { useState } from "react";
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


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar/>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/add/photo" element={<Photo />} />
                <Route path="/update/photo" element={<PhotoList />} />
                <Route path="/category" element={<Category />} />
                <Route path="/add/project" element={<Project />} />

                

                {/* add more routes here */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
