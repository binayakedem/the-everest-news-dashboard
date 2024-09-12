import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import FDashboard from "./pages/FDashboard";
import axios from "axios";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
function App() {
  const [theme, colorMode] = useMode();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get('http://localhost:5019/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();

    // Set a timeout to navigate to the login page after 5 seconds if not authenticated
    const timeout = setTimeout(() => {
      if (!authenticated) {
        navigate('/login');
      }
    }, 5000);

    return () => clearTimeout(timeout); // Clear timeout if component unmounts
  }, [authenticated, navigate]);
 console.log(user)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? (
          <div>Loading...</div> // Show a loading message or spinner
        ) : (
          <Routes>
            {authenticated ? (
              <Route path="/" element={<FDashboard />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
