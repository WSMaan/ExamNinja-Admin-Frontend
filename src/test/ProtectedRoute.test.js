import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: ({ to }) => <div>Redirected to {to}</div>,
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders element when logged in', () => {
    localStorage.setItem('isLoggedIn', 'true');
    const element = <div>Admin Dashboard</div>;

    const { getByText } = render(
      <Router>
        <ProtectedRoute element={element} />
      </Router>
    );

    expect(getByText('Admin Dashboard')).toBeInTheDocument();
  });

  test('redirects to login when not logged in', () => {
    const element = <div>Admin Dashboard</div>;

    const { getByText } = render(
      <Router>
        <ProtectedRoute element={element} />
      </Router>
    );

    expect(getByText('Redirected to /login')).toBeInTheDocument();
  });
});
