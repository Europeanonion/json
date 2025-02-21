import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { Workout } from '../types/workout.types'
import { v4 as uuidv4 } from 'uuid'
import { Exercise } from '../../exercises/types/exercise.types'
import { useExerciseContext } from '../../exercises/hooks/useExerciseContext'

interface WorkoutFormProps {
  workoutToEdit?: Workout
  onClose: () => void
}

const DEFAULT_WORKOUT: Omit<Workout, 'id' | 'exercises'> = {
  name: '',
  phase: '',
  week: 1
}

const PHASE_OPTIONS = ['Strength', 'Hypertrophy', 'Endurance']

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  workoutToEdit,
  onClose
}) => {
  const { dispatch: workoutDispatch } = useWorkoutContext()
  const { state: exerciseState } = useExerciseContext()
  const [workout, setWorkout] = useState<Omit<Workout, 'id' | 'exercises'>>(
    workoutToEdit
      ? {
          name: workoutToEdit.name,
          phase: workoutToEdit.phase,
          week: workoutToEdit.week
        }
      : DEFAULT_WORKOUT
  )
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>(
    workoutToEdit ? workoutToEdit.exercises.map(exercise => exercise.id) : []
  )
  const [errors, setErrors] = useState<
    Partial<Record<keyof Omit<Workout, 'id' | 'exercises'>, string>>
  >({})

  const validateForm = (): boolean => {
    const newErrors: Partial<
      Record<keyof Omit<Workout, 'id' | 'exercises'>, string>
    > = {}

    if (!workout.name.trim()) {
      newErrors.name = 'Workout name is required'
    }
    if (!workout.phase) {
      newErrors.phase = 'Phase is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement
    setWorkout(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleExerciseChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedExerciseIds(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const newWorkout: Workout = {
        ...workout,
        id: workoutToEdit?.id || uuidv4(),
        exercises: exerciseState.exercises.filter(exercise =>
          selectedExerciseIds.includes(exercise.id)
        )
      }

      if (workoutToEdit) {
        workoutDispatch({
          type: 'UPDATE_WORKOUT',
          payload: newWorkout
        })
      } else {
        workoutDispatch({
          type: 'ADD_WORKOUT',
          payload: newWorkout
        })
      }
      onClose()
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        {workoutToEdit ? 'Edit Workout' : 'Add New Workout'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Workout Name"
            value={workout.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Phase</InputLabel>
            <Select
              name="phase"
              value={workout.phase}
              label="Phase"
              onChange={handleChange}
              error={!!errors.phase}
            >
              {PHASE_OPTIONS.map(phase => (
                <MenuItem key={phase} value={phase}>
                  {phase}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            id="week"
            name="week"
            label="Week"
            value={workout.week}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="exercises-label">Exercises</InputLabel>
            <Select
              labelId="exercises-label"
              multiple
              value={selectedExerciseIds}
              onChange={handleExerciseChange}
              renderValue={selected => {
                const selectedExercises = exerciseState.exercises.filter(
                  exercise => selected.includes(exercise.id)
                )
                return selectedExercises.map(exercise => exercise.name).join(', ')
              }}
            >
              {exerciseState.exercises.map(exercise => (
                <MenuItem key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {workoutToEdit ? 'Update Workout' : 'Add Workout'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
