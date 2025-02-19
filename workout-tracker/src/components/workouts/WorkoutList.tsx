import { Grid, Box, Typography } from '@mui/material';
import { WorkoutCard } from './WorkoutCard';
import { useWorkoutContext } from '../../context/WorkoutContext';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { Exercise } from '../../types';

interface WorkoutListProps {
  exercises: Exercise[];
}

export const WorkoutList = ({ exercises }: WorkoutListProps) => {
  const { workouts } = useWorkoutContext();

  if (!workouts.length) {
    return <LoadingSpinner />;
  }

  return (
    <Grid container spacing={2} padding={2}>
      {exercises.map((exercise, index) => (
        <Grid item xs={12} sm={6} md={4} key={`${exercise.name}-${index}`}>
          <WorkoutCard exercise={exercise} />
        </Grid>
      ))}
    </Grid>
  );
};