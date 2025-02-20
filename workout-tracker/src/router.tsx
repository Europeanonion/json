import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { WorkoutList } from './components/workouts/WorkoutList'

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
        element: <div>Exercises Page</div>
      }
    ]
  }
])