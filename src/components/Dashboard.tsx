import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FileUpload from './FileUpload';
import { useWorkout } from '../contexts/WorkoutContext';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useWorkout();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileProcessed = (program: Program) => {
    dispatch({ type: 'SET_PROGRAM', payload: program });
    setIsUploading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {!state.currentProgram ? (
        <FileUpload 
          onFileProcessed={handleFileProcessed}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      ) : (
        <WorkoutOverview program={state.currentProgram} />
      )}
    </Box>
  );
};

export default Dashboard;