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
import { useExerciseContext } from '../hooks/useExerciseContext'
import { Exercise } from '../types/exercise.types'
import { v4 as uuidv4 } from 'uuid'

const DEFAULT_EXERCISE: Omit<Exercise, 'id'> = {
  name: '',
  warmupSets: '0',
  workingSets: '3',
  reps: '8-12',
  rpe: '7',
  rest: '2-3 min',
  substitutions: [],
  notes: ''
}

const WARMUP_SET_OPTIONS = ['0', '1', '2', '3']
const WORKING_SET_OPTIONS = ['1', '2', '3', '4', '5']
const RPE_OPTIONS = ['6', '7', '8', '9', '10']

export const ExerciseForm: React.FC = () => {
  const { state, dispatch } = useExerciseContext()
  const [exercise, setExercise] = useState<Omit<Exercise, 'id'>>(DEFAULT_EXERCISE)
  const [errors, setErrors] = useState<Partial<Record<keyof Exercise, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Exercise, string>> = {}

    if (!exercise.name.trim()) {
      newErrors.name = 'Exercise name is required'
    }

    if (parseInt(exercise.workingSets) < 1) {
      newErrors.workingSets = 'Must have at least 1 working set'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement
    setExercise(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      const newExercise: Exercise = {
        ...exercise,
        id: uuidv4()
      }

      dispatch({
        type: 'ADD_EXERCISE',
        payload: newExercise
      })

      // Reset form
      setExercise(DEFAULT_EXERCISE)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Add New Exercise
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Exercise Name"
            value={exercise.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Warmup Sets</InputLabel>
            <Select
              name="warmupSets"
              value={exercise.warmupSets}
              label="Warmup Sets"
              onChange={handleChange}
            >
              {WARMUP_SET_OPTIONS.map(sets => (
                <MenuItem key={sets} value={sets}>
                  {sets}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Working Sets</InputLabel>
            <Select
              name="workingSets"
              value={exercise.workingSets}
              label="Working Sets"
              onChange={handleChange}
              error={!!errors.workingSets}
            >
              {WORKING_SET_OPTIONS.map(sets => (
                <MenuItem key={sets} value={sets}>
                  {sets}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="reps"
            name="reps"
            label="Reps"
            value={exercise.reps}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>RPE</InputLabel>
            <Select
              name="rpe"
              value={exercise.rpe}
              label="RPE"
              onChange={handleChange}
            >
              {RPE_OPTIONS.map(rpe => (
                <MenuItem key={rpe} value={rpe}>
                  {rpe}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="rest"
            name="rest"
            label="Rest Period"
            value={exercise.rest}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="notes"
            name="notes"
            label="Notes"
            multiline
            rows={3}
            value={exercise.notes}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3, mb: 2 }}
          >
            Add Exercise
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
