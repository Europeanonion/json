import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { WorkoutList } from './features/workouts'
import { ExercisesPage } from './features/exercises'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'workouts',
        element: <WorkoutList />
      },
      {
        path: 'exercises',
        element: <ExercisesPage />
      }
    ]
  }
])
