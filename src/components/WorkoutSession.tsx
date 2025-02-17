import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, List } from '@mui/material';
import { useWorkout } from '../contexts/WorkoutContext';
import ExerciseCard from './ExerciseCard';
import Timer from './Timer';

const WorkoutSession: React.FC = () => {
  const { day } = useParams<{ day: string }>();
  const { state, dispatch } = useWorkout();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [restTimer, setRestTimer] = useState<number | null>(null);

  const handleExerciseComplete = (exerciseData: CompletedExercise) => {
    dispatch({ 
      type: 'LOG_EXERCISE', 
      payload: { 
        day: parseInt(day!, 10),
        exercise: exerciseData 
      } 
    });
    
    if (restTimer) {
      setRestTimer(null);
    }
    
    setCurrentExerciseIndex(prev => prev + 1);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Workout interface */}
    </Box>
  );
};

export default WorkoutSession;