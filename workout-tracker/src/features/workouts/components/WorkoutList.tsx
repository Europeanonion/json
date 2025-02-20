import { Grid } from '@mui/material'
import { WorkoutCard } from './WorkoutCard'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'

export const WorkoutList = () => {
  const { state } = useWorkoutContext()

  if (!state.workouts.length) {
    return <LoadingSpinner />
  }

  const currentWorkout = state.workouts[0] // For now, show first workout's exercises

  return (
    <Grid container spacing={2} padding={2}>
      {currentWorkout.exercises.map((exercise, index) => (
        <Grid item xs={12} sm={6} md={4} key={`${exercise.name}-${index}`}>
          <WorkoutCard exercise={exercise} />
        </Grid>
      ))}
    </Grid>
  )
}
