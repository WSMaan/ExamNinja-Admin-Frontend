

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
