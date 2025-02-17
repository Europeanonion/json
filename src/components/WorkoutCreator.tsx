import React, { useState } from 'react';
import { 
  Box,
  Button,
  Typography,
  List
} from '@mui/material';
import { ExerciseSelector } from './ExerciseSelector';
import { ExerciseData } from '../services/ExerciseDataService';

export const WorkoutCreator: React.FC = () => {
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const handleExerciseSelect = (exercise: ExerciseData) => {
    setExercises([...exercises, exercise]);
    setSelectorOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Create Workout</Typography>
      <Button 
        variant="contained" 
        onClick={() => setSelectorOpen(true)}
      >
        Add Exercise
      </Button>

      <List>
        {exercises.map((exercise, index) => (
          <ExerciseListItem 
            key={index}
            exercise={exercise}
            onRemove={() => {
              const newExercises = [...exercises];
              newExercises.splice(index, 1);
              setExercises(newExercises);
            }}
          />
        ))}
      </List>

      <ExerciseSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={handleExerciseSelect}
      />
    </Box>
  );
};