import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { useState } from 'react'
import type { Exercise } from '../../exercises/types/exercise.types'
import type { Workout } from '../types/workout.types'


interface WorkoutCardProps {
  exercise: Exercise
  workout: Workout
}

export const WorkoutCard = ({ exercise, workout }: WorkoutCardProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            {exercise.name}
          </Typography>
          <IconButton 
            onClick={() => setExpanded(!expanded)}
            data-testid="expand-button"
            aria-label={expanded ? 'show less' : 'show more'}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Box display="flex" gap={1} mb={1}>
          <Chip label={`${exercise.warmupSets} warmup sets`} size="small" />
          <Chip label={`${exercise.workingSets} sets`} size="small" />
          <Chip label={`${exercise.reps} reps`} size="small" />
          <Chip label={`RPE ${exercise.rpe}`} size="small" />
        </Box>
        {expanded && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Rest: {exercise.rest}
            </Typography>
            {exercise.substitutions.length > 0 && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Substitutions: {exercise.substitutions.join(', ')}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {exercise.notes}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
