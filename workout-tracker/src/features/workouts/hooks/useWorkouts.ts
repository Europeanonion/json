import { useEffect } from 'react'
import { useWorkoutContext } from './useWorkoutContext'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import type { Workout } from '../types/workout.types'

export const useWorkouts = () => {
  const { state, dispatch } = useWorkoutContext()
  const [storedWorkouts, setStoredWorkouts] = useLocalStorage<Workout[]>('workouts', [])

  useEffect(() => {
    if (storedWorkouts.length && !state.workouts.length) {
      storedWorkouts.forEach(workout => 
        dispatch({ type: 'ADD_WORKOUT', payload: workout })
      )
    }
  }, [storedWorkouts, state.workouts.length, dispatch])

  return { 
    workouts: state.workouts,
    addWorkout: (workout: Workout) => dispatch({ type: 'ADD_WORKOUT', payload: workout })
  }
}
