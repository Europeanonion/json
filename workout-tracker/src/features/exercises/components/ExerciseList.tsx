import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useExerciseContext } from '../hooks/useExerciseContext'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'
import { ExerciseActionType } from '../types/exercise.types'

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
    dispatch({ type: ExerciseActionType.REMOVE_EXERCISE, payload: id })
  }

  const handleEdit = (id: string) => {
    const exercise = state.exercises.find(ex => ex.id === id)
    if (exercise) {
      dispatch({ type: ExerciseActionType.SELECT_EXERCISE, payload: exercise })
    }
  }

  return (
    <List>
      {state.exercises.map(exercise => (
        <ListItem
          key={exercise.id}
          secondaryAction={
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
          }
          sx={{
            bgcolor: state.selectedExercise?.id === exercise.id ? 'action.selected' : 'background.paper'
          }}
        >
          <ListItemIcon>
            <Chip label={`RPE ${exercise.rpe}`} size="small" variant="outlined" />
          </ListItemIcon>
          <ListItemText
            primary={exercise.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {`${exercise.warmupSets} warmup sets, ${exercise.workingSets} working sets x ${exercise.reps} reps`}
                </Typography>
                {exercise.substitutions.length > 0 && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Substitutions: {exercise.substitutions.join(', ')}
                  </Typography>
                )}
                {exercise.notes && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {exercise.notes}
                  </Typography>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
