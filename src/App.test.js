import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import '@testing-library/jest-dom';

test('renders ExamNinja Admin Login', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );

  const loginText = screen.getByText(/ExamNinja Admin Login/i);
  expect(loginText).toBeInTheDocument();
});
