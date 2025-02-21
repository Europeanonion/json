import { useReducer, useEffect, useState } from 'react'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import { WorkoutContext } from './WorkoutContext'
import { workoutReducer, initialWorkoutState } from './workoutReducer'
import type { Workout } from '../types/workout.types'
import type { Exercise } from '../../exercises/types/exercise.types'

interface WorkoutProviderProps {
  children: React.ReactNode
}

const validateWorkout = (workout: Workout, availableExercises: Exercise[]): { isValid: boolean; errors: string[] } => {
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

  // Validate exercise references
  const availableExerciseIds = new Set(availableExercises.map(e => e.id))
  workout.exercises.forEach((exercise, index) => {
    if (!availableExerciseIds.has(exercise.id)) {
      errors.push(`Exercise at index ${index} (${exercise.name}) is not available`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function WorkoutProvider({ children }: WorkoutProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [savedWorkouts, setSavedWorkouts] = useLocalStorage<Workout[]>('workouts', [])
  const [savedExercises] = useLocalStorage<Exercise[]>('exercises', [])
  
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
        // Clean up deleted exercise references and validate workouts
        const updatedWorkouts = state.workouts.map(workout => ({
          ...workout,
          exercises: workout.exercises.filter(exercise => 
            savedExercises.some(e => e.id === exercise.id)
          )
        }))

        // Validate workouts before saving
        const validWorkouts = updatedWorkouts.filter(workout => validateWorkout(workout, savedExercises).isValid)
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
