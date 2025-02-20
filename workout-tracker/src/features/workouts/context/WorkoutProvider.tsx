import { useReducer, useEffect, useState } from 'react'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import { WorkoutContext } from './WorkoutContext'
import { workoutReducer, initialWorkoutState } from './workoutReducer'
import type { Workout } from '../types/workout.types'

interface WorkoutProviderProps {
  children: React.ReactNode
}

const validateWorkout = (workout: Workout): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!workout.id) {
    errors.push('Workout ID is required')
  }
  if (!workout.name) {
    errors.push('Workout name is required')
  }
  if (typeof workout.name !== 'string') {
    errors.push('Workout name must be a string')
  }
  if (workout.name && workout.name.length === 0) {
    errors.push('Workout name cannot be empty')
  }
  if (!Array.isArray(workout.exercises)) {
    errors.push('Exercises must be an array')
  }
  if (typeof workout.week !== 'number') {
    errors.push('Week must be a number')
  }
  if (!workout.phase) {
    errors.push('Phase is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
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
