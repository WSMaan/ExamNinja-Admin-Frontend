import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login'; // Adjust the path as necessary
import apiService from '../services/apiService'; // Mock this service
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

jest.mock('../services/apiService');

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  test('renders the login form', () => {
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('successful login', async () => {
    apiService.login.mockResolvedValue({ status: 'success' }); // Mock successful login
  
    // Wrap state updates in act(...)
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
      fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    });
  
    // Check localStorage for the login status
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
  });
   
  
});
