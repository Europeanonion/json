import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Button variant="contained">Save Settings</Button>
    </Box>
  );
};

export default Settings;