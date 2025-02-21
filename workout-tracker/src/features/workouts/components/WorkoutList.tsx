import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material'
import { WorkoutCard } from './WorkoutCard'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'
import { WorkoutForm } from './WorkoutForm'
import { useState } from 'react'

export default function WorkoutList() {
  const { state } = useWorkoutContext()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (state.isLoading) {
    return <LoadingSpinner />
  }

  if (state.error) {
    return (
      <Typography variant="body1" color="error">
        Error loading workouts: {state.error.message}
      </Typography>
    )
  }

  if (state.workouts.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h6" gutterBottom>No workouts found.</Typography>
        <Typography variant="body1" gutterBottom>
          Get started by adding your first workout!
        </Typography>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Workout
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Workout</DialogTitle>
        <DialogContent>
          <WorkoutForm onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 2 }}>
            Add Workout
          </Button>
        </Grid>
        {state.workouts.map(workout => (
          <Grid item xs={12} key={workout.id}>
            <Typography variant="h5" gutterBottom>{workout.name}</Typography>
            <Grid container spacing={2}>
              {workout.exercises.map(exercise => (
                <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                  <WorkoutCard exercise={exercise} workout={workout} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
