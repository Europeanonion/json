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
  SelectChangeEvent,
  FormHelperText
} from '@mui/material'
import { useExerciseContext } from '../hooks/useExerciseContext'
import { Exercise } from '../types/exercise.types'
import { v4 as uuidv4 } from 'uuid'
import { ExerciseActionType } from '../types/exercise.types'

interface ExerciseFormProps {
  exerciseToEdit?: Exercise
}

const DEFAULT_EXERCISE = {
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
const REP_OPTIONS = ['8-12', '10-15', '12-15', '15+']
const RPE_OPTIONS = ['6', '7', '8', '9', '10']
const REST_OPTIONS = ['1-2 min', '2-3 min', '3-4 min']

export const ExerciseForm: React.FC<ExerciseFormProps> = ({ exerciseToEdit }) => {
  const { state, dispatch } = useExerciseContext()
  const [exercise, setExercise] = useState<{
    name: string;
    warmupSets: string;
    workingSets: string;
    reps: string;
    rpe: string;
    rest: string;
    substitutions: string[];
    notes: string;
  }>(
    exerciseToEdit
      ? { ...exerciseToEdit, substitutions: exerciseToEdit.substitutions as string[] }
      : DEFAULT_EXERCISE
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Exercise, 'id'>, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<Exercise, 'id'>, string>> = {}

    if (!exercise.name.trim()) {
      newErrors.name = 'Exercise name is required'
    }

    // Check for duplicate exercise names
    if (
      state.exercises.some(
        ex => ex.name.toLowerCase() === exercise.name.toLowerCase() && ex.id !== exerciseToEdit?.id
      )
    ) {
      newErrors.name = 'Exercise name already exists'
    }

    if (parseInt(exercise.workingSets) < 1) {
      newErrors.workingSets = 'Must have at least 1 working set'
    }

    // Validate reps, rpe and rest
    if (!/^\d+(-\d+)?$/.test(exercise.reps)) {
      newErrors.reps = 'Reps must be a number or range (e.g., "8" or "8-12")'
    }

    if (!/^\d+$/.test(exercise.rpe) || parseInt(exercise.rpe) < 6 || parseInt(exercise.rpe) > 10) {
      newErrors.rpe = 'RPE must be a number between 6 and 10'
    }

    if (!/^\d+-\d+ min$/.test(exercise.rest)) {
      newErrors.rest = 'Rest must be in format "minutes-minutes min" (e.g. 1-2 min)'
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

  const handleSubstitutionChange = (event: SelectChangeEvent<string[]>) => {
    setExercise({ ...exercise, substitutions: event.target.value as string[] })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const newExercise: Exercise = {
        ...exercise,
        id: exerciseToEdit?.id || uuidv4()
      }

      if (exerciseToEdit) {
        dispatch({
          type: ExerciseActionType.UPDATE_EXERCISE,
          payload: newExercise
        })
        dispatch({ type: ExerciseActionType.CLEAR_SELECTED_EXERCISE })
      } else {
        dispatch({
          type: ExerciseActionType.ADD_EXERCISE,
          payload: newExercise
        })
      }

      setExercise(DEFAULT_EXERCISE)
      setErrors({})
    }
  }

  const handleClear = () => {
    setExercise(DEFAULT_EXERCISE)
    setErrors({})
    if (exerciseToEdit) {
      dispatch({ type: ExerciseActionType.CLEAR_SELECTED_EXERCISE })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        {exerciseToEdit ? 'Edit Exercise' : 'Add New Exercise'}
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
          <FormControl fullWidth error={!!errors.warmupSets}>
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
            <FormHelperText>{errors.warmupSets}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={!!errors.workingSets}>
            <InputLabel>Working Sets</InputLabel>
            <Select
              name="workingSets"
              value={exercise.workingSets}
              label="Working Sets"
              onChange={handleChange}
            >
              {WORKING_SET_OPTIONS.map(sets => (
                <MenuItem key={sets} value={sets}>
                  {sets}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.workingSets}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={!!errors.reps}>
            <InputLabel>Reps</InputLabel>
            <Select
              name="reps"
              value={exercise.reps}
              label="Reps"
              onChange={handleChange}
            >
              {REP_OPTIONS.map(reps => (
                <MenuItem key={reps} value={reps}>
                  {reps}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.reps}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={!!errors.rpe}>
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
            <FormHelperText>{errors.rpe}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.rest}>
            <InputLabel>Rest</InputLabel>
            <Select
              name="rest"
              value={exercise.rest}
              label="Rest"
              onChange={handleChange}
            >
              {REST_OPTIONS.map(rest => (
                <MenuItem key={rest} value={rest}>
                  {rest}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.rest}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.substitutions}>
            <InputLabel id="substitutions-label">Substitutions</InputLabel>
            <Select
              labelId="substitutions-label"
              id="substitutions"
              multiple
              value={exercise.substitutions}
              onChange={handleSubstitutionChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {state.exercises
                .filter(ex => ex.id !== exerciseToEdit?.id)
                .map((ex) => (
                  <MenuItem key={ex.id} value={ex.name}>
                    {ex.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>{errors.substitutions}</FormHelperText>
          </FormControl>
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
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            sx={{ mr: 2 }}
          >
            Clear
          </Button>
          <Button type="submit" variant="contained">
            {exerciseToEdit ? 'Update Exercise' : 'Add Exercise'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
