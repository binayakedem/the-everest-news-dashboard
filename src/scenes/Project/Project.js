import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  Button,
  Modal,
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryItem = ({ category, onUpdate, onDelete }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{category.name}</Typography>
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => onUpdate(category)} sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(category)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

const Project = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateFormData, setUpdateFormData] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo: null,
    icons: [],
    link: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    // formDataToSend.append('photo', formData.photo[0]); // Assuming a single file
    formDataToSend.append('link', formData.link);
    // for (const icon of formData.icons) {
    //   formDataToSend.append('icons', icon); // Append each icon file
    // }

    try {
      const response = await axios.post('http://192.168.15.244:5000/api/projects/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Project submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };
// here ends the form submistoin
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleUpdate = (category) => {
    setSelectedCategory(category._id);
    setUpdateFormData(category.name);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${selectedCategory}`, {
        name: updateFormData,
      });
      fetchCategories();
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

//   const handleAddSubmit = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/categories', { name: addFormData });
//       fetchCategories();
//       setShowAddModal(false);
//       setAddFormData('');
//     } catch (error) {
//       console.error('Error adding category:', error);
//     }
//   };

  const handleDelete = (category) => {
    setSelectedCategory(category._id);
    setShowDeleteModal(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${selectedCategory}`);
      fetchCategories();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Button variant="contained" color="secondary" onClick={() => setShowAddModal(true)} sx={{ mt: 2 }}>
        Add Project
      </Button>
      <Typography variant="h2" gutterBottom>
        Project
      </Typography>
      {categories.map((category) => (
        <CategoryItem
          key={category._id}
          category={category}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}

      <Dialog open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <DialogTitle>Update Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="updateCategory"
            label="New Project Name"
            type="text"
            fullWidth
            value={updateFormData}
            onChange={(e) => setUpdateFormData(e.target.value)}
          />
          
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setShowUpdateModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Project Title"
          color="secondary"
          type="text"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          color="secondary"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="photo"
          name="photo"
          label="Photo"
          color="secondary"
          type="file"
          fullWidth
          onChange={handleFileChange}
        />
        <TextField
          margin="dense"
          id="icons"
          name="icons"
          label="Icon"
          color="secondary"
          type="file"
          fullWidth
          onChange={handleFileChange}
        />
        <TextField
          margin="dense"
          id="link"
          name="link"
          label="Project Link"
          color="secondary"
          type="text"
          fullWidth
          value={formData.link}
          onChange={handleChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSubmit} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Project;
