import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Exercise } from '../../types';

interface WorkoutCardProps {
  exercise: Exercise;
}

export const WorkoutCard = ({ exercise }: WorkoutCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {exercise.name}
        </Typography>
        <Box display="flex" gap={1} mb={1}>
          <Chip label={`${exercise.workingSets} sets`} size="small" />
          <Chip label={`${exercise.reps} reps`} size="small" />
          <Chip label={`RPE ${exercise.rpe}`} size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {exercise.notes}
        </Typography>
      </CardContent>
    </Card>
  );
};