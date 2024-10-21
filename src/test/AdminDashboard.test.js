import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import '@testing-library/jest-dom';

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Create a mock localStorage
const mockLocalStorage = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

beforeEach(() => {
  // Replace the global localStorage with the mock
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
});

test('renders Welcome to ExamNinja Admin', () => {
  render(
    <Router>
      <AdminDashboard />
    </Router>
  );

  const welcomeText = screen.getByText(/Welcome to ExamNinja Admin/i);
  expect(welcomeText).toBeInTheDocument();
});

test('logout button works correctly', () => {
  render(
    <Router>
      <AdminDashboard />
    </Router>
  );

  const logoutButton = screen.getByRole('button', { name: /Logout/i });
  fireEvent.click(logoutButton);

  // Check if localStorage.removeItem was called correctly
  expect(localStorage.removeItem).toHaveBeenCalledWith('isLoggedIn');
  expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
});
