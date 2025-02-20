import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { router } from './router'
import { theme } from './styles/theme'
import { WorkoutProvider } from './features/workouts'
import { ExerciseProvider } from './features/exercises'
import { ErrorBoundary } from './components/common/ErrorBoundary'

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <ExerciseProvider>
          <WorkoutProvider>
            <RouterProvider router={router} />
          </WorkoutProvider>
        </ExerciseProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
