import { useReducer, useEffect, useState } from 'react'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import { WorkoutContext } from './WorkoutContext'
import { workoutReducer, initialWorkoutState } from './workoutReducer'
import type { Workout } from '../types/workout.types'

interface WorkoutProviderProps {
  children: React.ReactNode
}

const validateWorkout = (workout: Workout): boolean => {
  return Boolean(
    workout.id &&
    workout.name &&
    typeof workout.name === 'string' &&
    workout.name.length > 0 &&
    Array.isArray(workout.exercises) &&
    typeof workout.week === 'number' &&
    workout.phase
  )
}

export function WorkoutProvider({ children }: WorkoutProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [savedWorkouts, setSavedWorkouts] = useLocalStorage<Workout[]>('workouts', [])
  
  const [state, dispatch] = useReducer(workoutReducer, {
    ...initialWorkoutState,
    workouts: savedWorkouts,
    isLoading,
    error
  })

  // Sync state changes with localStorage
  useEffect(() => {
    const syncToStorage = async () => {
      try {
        setIsLoading(true)
        // Validate workouts before saving
        const validWorkouts = state.workouts.filter(validateWorkout)
        if (validWorkouts.length !== state.workouts.length) {
          console.warn('Some workouts failed validation and were not saved')
        }
        await setSavedWorkouts(validWorkouts)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to save workouts'))
        console.error('Failed to sync workouts to storage:', err)
      } finally {
        setIsLoading(false)
      }
    }

    syncToStorage()
  }, [state.workouts, setSavedWorkouts])

  return (
    <WorkoutContext.Provider value={{ 
      state: { 
        ...state, 
        isLoading, 
        error 
      }, 
      dispatch 
    }}>
      {children}
    </WorkoutContext.Provider>
  )
}
