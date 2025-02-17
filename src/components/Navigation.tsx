import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Workout Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/progress">
          Progress
        </Button>
        <Button color="inherit" component={Link} to="/settings">
          Settings
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;