import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PhotoListItem = ({ photo, onUpdate, onDelete }) => {
  return (
    <ListItem className="d-flex justify-content-between align-items-center">
      <div>
        <img
          src={`http://localhost:5000/api/photos/${photo.imagePath}`}
          alt={photo.description}
          className="img-thumbnail"
          style={{
            maxWidth: "100px",
            maxHeight: "100px",
            marginRight: "10px",
          }}
          onError={() =>
            console.error("Error loading image:", photo.imagePath)
          }
        />
        <ListItemText primary={photo.description} />
      </div>
      <div>
        <Tooltip title="Edit">
          <IconButton onClick={() => onUpdate(photo)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(photo)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </ListItem>
  );
};

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false); 

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/photos/"
      );
      setPhotos(response.data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleUpdate = (photo) => {
    setSelectedPhoto(photo);
    setUpdateFormData({
      description: photo.description,
    });
    setShowUpdateModal(true);
  };

  const handleDelete = (photo) => {
    setSelectedPhoto(photo);
    setShowDeleteModal(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/photos/${selectedPhoto._id}`,
        {
          description: updateFormData.description,
        }
      );

      fetchPhotos();
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/photos/${selectedPhoto._id}`
      );

      fetchPhotos();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Box mb={3}>
        <Typography variant="h2">Photo List</Typography>
        <TextField
          placeholder="Search by description"
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
          color="secondary"
          fullWidth
          margin="normal"
        />
      </Box>

      <List>
        {photos
          .filter((photo) =>
            photo.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((photo) => (
            <PhotoListItem
              key={photo._id}
              photo={photo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
      </List>

      {/* Update Photo Dialog */}
      <Dialog open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <DialogTitle>Update Photo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={updateFormData.description}
            onChange={(e) =>
              setUpdateFormData({
                ...updateFormData,
                description: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="secondary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this photo?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PhotoList;
