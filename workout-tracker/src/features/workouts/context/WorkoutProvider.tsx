import { useReducer, useEffect } from 'react'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import { WorkoutContext } from './WorkoutContext'
import { workoutReducer, initialWorkoutState } from './workoutReducer'
import type { Workout } from '../types/workout.types'

interface WorkoutProviderProps {
  children: React.ReactNode
}

export function WorkoutProvider({ children }: WorkoutProviderProps) {
  const [savedWorkouts, setSavedWorkouts] = useLocalStorage<Workout[]>('workouts', [])
  const [state, dispatch] = useReducer(workoutReducer, {
    ...initialWorkoutState,
    workouts: savedWorkouts
  })

  // Sync state changes with localStorage
  useEffect(() => {
    setSavedWorkouts(state.workouts)
  }, [state.workouts, setSavedWorkouts])

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  )
}
