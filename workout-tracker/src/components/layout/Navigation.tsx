import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FitnessCenter, Timeline, Settings } from '@mui/icons-material';
import { useState } from 'react';

export const Navigation = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigationAction label="Workouts" icon={<FitnessCenter />} />
      <BottomNavigationAction label="Progress" icon={<Timeline />} />
      <BottomNavigationAction label="Settings" icon={<Settings />} />
    </BottomNavigation>
  );
};