import React, { useState } from 'react';
import { Card, CardActions, CardContent, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Avatar } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import "./user.css";
import { initialData } from './data';



const CardLayout = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({ id: null, name: '', mobile: '', email: '' });

  const handleOpenDialog = (record) => {
    setCurrentRecord(record);
    setFormData(record || { id: null, name: '', mobile: '', email: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleViewDialog = (record) => {
    setCurrentRecord(record);
    setViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (currentRecord) {
      setData((prevData) => prevData.map((item) => (item.id === formData.id ? formData : item)));
    } else {
      setData((prevData) => [...prevData, { ...formData, id: data.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Filter data based on the search query
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='main-container'>
      <TextField
        label="Search..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
       className='text-filed'

      />
      <br></br>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenDialog(null)}
        style={{ marginBottom: 20 }}
      >
        Add New
      </Button>

      {filteredData.map((item) => (
        <Card className='main-card' key={item.id}>
          <CardContent className='name-card'>
            <Typography variant="h6">{item.id}</Typography>
          </CardContent>

          <CardContent className='name-card'>
            <Avatar />
            <div>
              <Typography variant="h6">{item.name}</Typography>
              <Typography color="textSecondary">{item.mobile}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleOpenDialog(item)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(item.id)} color="error">
              <Delete />
            </IconButton>
            <IconButton onClick={() => handleViewDialog(item)} color="info">
              <Visibility />
            </IconButton>
          </CardActions>
        </Card>
      ))}

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentRecord ? 'Edit Record' : 'Add Record'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Mobile"
            name="mobile"
            fullWidth
            value={formData.mobile}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for View */}
      <Dialog open={viewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>View Record</DialogTitle>
        <DialogContent>
          <Typography variant="body1"><strong>Name:</strong> {currentRecord?.name}</Typography>
          <Typography variant="body1"><strong>Mobile:</strong> {currentRecord?.mobile}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {currentRecord?.email}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardLayout;
