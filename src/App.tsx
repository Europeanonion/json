import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { WorkoutProvider } from './contexts/WorkoutContext';
import { theme } from './theme';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import WorkoutSession from './components/WorkoutSession';
import ProgressTracker from './components/ProgressTracker';
import Settings from './components/Settings';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WorkoutProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workout/:day" element={<WorkoutSession />} />
              <Route path="/progress" element={<ProgressTracker />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </BrowserRouter>
        </WorkoutProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;