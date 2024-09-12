import React from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/topbar";
import Sidebar from "../scenes/global/sidebar";
import Tags from "../scenes/TagsAndCategory/Tags";
import Photo from "../scenes/PhotoAndVideo/Photo";
import PhotoList from "../scenes/PhotoAndVideo/PhotoList";
import Category from "../scenes/TagsAndCategory/Category";
import Project from "../scenes/Project/Project";
import Profile from "../Authentication/Profile";
const FDashboard = () => {
  return (
    <div className="app">
          <Sidebar/>
          <main className="conten">
            <Topbar/>
            <Routes>
                <Route path="/tags" element={<Tags />} />
                <Route path="/add/photo" element={<Photo />} />
                <Route path="/update/photo" element={<PhotoList />} />
                <Route path="/category" element={<Category />} />
                <Route path="/add/project" element={<Project />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* add more routes here */}
            </Routes>
          </main>
        </div>
  )
}

export default FDashboard