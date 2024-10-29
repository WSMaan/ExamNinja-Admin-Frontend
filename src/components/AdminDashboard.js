import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear authentication status
    navigate('/login'); // Redirect back to the login page
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to ExamNinja Admin
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginTop: '2rem' }}
        onClick={() => navigate('/admin/upload')}
      >
        Go to Upload Portal
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogout} 
        sx={{ marginTop: '2rem' }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default AdminDashboard;
