import React from 'react'
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Box,
  Chip
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useExerciseContext } from '../hooks/useExerciseContext'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'

export const ExerciseList: React.FC = () => {
  const { state, dispatch } = useExerciseContext()

  if (state.isLoading) {
    return <LoadingSpinner />
  }

  if (!state.exercises.length) {
    return (
      <Box p={2}>
        <Typography variant="body1" color="text.secondary">
          No exercises added yet. Use the form above to add your first exercise.
        </Typography>
      </Box>
    )
  }

  const handleDelete = (id: string) => {
    dispatch({ type: 'REMOVE_EXERCISE', payload: id })
  }

  const handleEdit = (id: string) => {
    const exercise = state.exercises.find(ex => ex.id === id)
    if (exercise) {
      dispatch({ type: 'SELECT_EXERCISE', payload: exercise })
    }
  }

  return (
    <Grid container spacing={2} padding={2}>
      {state.exercises.map(exercise => (
        <Grid item xs={12} sm={6} md={4} key={exercise.id}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="h2">
                  {exercise.name}
                </Typography>
                <Box>
                  <IconButton 
                    onClick={() => handleEdit(exercise.id)}
                    aria-label="edit exercise"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(exercise.id)}
                    aria-label="delete exercise"
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Chip 
                  label={`${exercise.warmupSets} warmup sets`} 
                  size="small" 
                  variant="outlined"
                />
                <Chip 
                  label={`${exercise.workingSets} working sets`} 
                  size="small"
                  variant="outlined"
                />
                <Chip 
                  label={`${exercise.reps} reps`} 
                  size="small"
                  variant="outlined"
                />
                <Chip 
                  label={`RPE ${exercise.rpe}`} 
                  size="small"
                  variant="outlined"
                />
              </Box>
              {exercise.notes && (
                <Typography variant="body2" color="text.secondary" mt={2}>
                  {exercise.notes}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
