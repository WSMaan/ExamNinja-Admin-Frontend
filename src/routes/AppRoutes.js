import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import AdminDashboard from '../components/AdminDashboard';
import UploadForm from '../components/UploadForm';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />   
    <Route path="/login" element={<Login />} />
    <Route 
      path="/admin-dashboard" 
      element={<ProtectedRoute element={<AdminDashboard />} />} 
    />
    <Route 
      path="/admin/upload" 
      element={<ProtectedRoute element={<UploadForm />} />} 
    />
    <Route path="/login" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
