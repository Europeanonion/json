import { Box, Typography } from '@mui/material';
import { WorkoutCard } from './WorkoutCard';
import { useWorkoutContext } from '../../context/WorkoutContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const WorkoutList = () => {
  const { workouts } = useWorkoutContext();

  if (!workouts.length) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      {workouts.map((workout, index) => (
        <Box key={index} mb={2}>
          <Typography variant="h5" gutterBottom>
            {workout.name} - Week {workout.week}
          </Typography>
          {workout.exercises.map((exercise, idx) => (
            <WorkoutCard key={idx} exercise={exercise} />
          ))}
        </Box>
      ))}
    </Box>
  );
};