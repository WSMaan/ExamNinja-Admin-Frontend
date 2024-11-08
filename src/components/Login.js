import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService'; // Import the apiService
import * as Yup from 'yup';
import { Formik } from 'formik';

const Login = () => {
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

  const handleLogin = async (values) => {
    const trimmedUsername = values.username.trim();
    const password = values.password; // Get password from values
  
    try {
      const response = await apiService.login(trimmedUsername, password);
      if (response.status === 'success') {
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.'); // Display the proper error message
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
         ExamNinja Admin Login
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={values.username}
            onChange={handleChange('username')}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={values.password}
            onChange={handleChange('password')}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
          )}
          </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
