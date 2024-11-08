import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import * as Yup from 'yup';
import { Formik } from 'formik'; // Import the apiService

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .test('no-space', 'Password cannot contain only spaces', value => {
        return value && value.trim() !== ''; // Ensure password is not just spaces
      }),
  });
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await apiService.login(username, password);
      if (response.status === 'success') {
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setErrorMessage(error); // Display the proper error message
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
         ExamNinja Admin Login
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
