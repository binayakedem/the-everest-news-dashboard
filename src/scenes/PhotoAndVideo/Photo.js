import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, useTheme } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokens } from "../../theme";


const PhotoGrid = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
  
    const handleFileChange = (e) => {
      setImageFiles(e.target.files);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('uploadDate', new Date().toISOString()); // Add the current date
        for (let i = 0; i < imageFiles.length; i++) {
          formData.append('images', imageFiles[i]);
        }
  
        // Make sure to update the endpoint to your actual backend URL
        await axios.post('http://localhost:5000/api/photos/create', formData);
  
        // Show success notification
        toast.success('Photos uploaded successfully', {
          position: 'top-center',
          autoClose: 2000, // Notification will close after 2 seconds
        });
  
        // Clear description and selected files after successful upload
        setDescription('');
        setImageFiles([]);
      } catch (error) {
        console.error('Error uploading photos:', error);
        // Show error notification
        toast.error('Error uploading photos', {
          position: 'top-center',
          autoClose: 2000,
        });
      }
    };
    
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="50vh"
        >
          <Typography variant="h4" gutterBottom>Upload Photos</Typography>
    
          {/* Upload Form */}
          <Box mt={2}>
            <TextField
              label="Description"
              variant="outlined"
              color="secondary"
              fullWidth
              placeholder="Enter photo description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Box>
          <Box mt={2}>
            <input type="file" multiple onChange={handleFileChange} />
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="secondary" onClick={handleUpload}>
              Upload
            </Button>
          </Box>
        </Box>
      );
};

export default PhotoGrid;
