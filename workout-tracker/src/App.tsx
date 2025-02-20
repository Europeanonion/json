import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { router } from './router'
import { theme } from './styles/theme'
import { WorkoutProvider } from './features/workouts'
import { ExerciseProvider } from './features/exercises'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { LoadingSpinner } from './components/common/LoadingSpinner'
import { useExerciseContext } from './features/exercises/hooks/useExerciseContext'
import { useWorkoutContext } from './features/workouts/hooks/useWorkoutContext'

function AppContent() {
  const { state: exerciseState } = useExerciseContext()
  const { state: workoutState } = useWorkoutContext()

  if (exerciseState.isLoading || workoutState.isLoading) {
    return <LoadingSpinner />
  }

  return <RouterProvider router={router} />
}

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <ExerciseProvider>
          <WorkoutProvider>
            <AppContent />
          </WorkoutProvider>
        </ExerciseProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
