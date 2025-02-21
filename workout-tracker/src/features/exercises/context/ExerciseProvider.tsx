import { useReducer, useEffect, useState } from 'react'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import { ExerciseContext } from './ExerciseContext'
import { exerciseReducer, initialExerciseState } from './exerciseReducer'
import type { Exercise } from '../types/exercise.types'

interface ExerciseProviderProps {
  children: React.ReactNode
}

const validateExercise = (exercise: Exercise): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!exercise.id) {
    errors.push('Exercise ID is required')
  }
  if (!exercise.name) {
    errors.push('Exercise name is required')
  }
  if (typeof exercise.name !== 'string') {
    errors.push('Exercise name must be a string')
  }
  if (exercise.name && exercise.name.length === 0) {
    errors.push('Exercise name cannot be empty')
  }
  
  // Validate RPE range
  const rpeNum = parseFloat(exercise.rpe)
  if (isNaN(rpeNum) || rpeNum < 1 || rpeNum > 10) {
    errors.push('RPE must be a number between 1 and 10')
  }

  // Validate sets and reps format
  if (!/^\d+$/.test(exercise.warmupSets)) {
    errors.push('Warmup sets must be a valid number')
  }
  if (!/^\d+$/.test(exercise.workingSets)) {
    errors.push('Working sets must be a valid number')
  }
  if (!/^\d+(-\d+)?$/.test(exercise.reps)) {
    errors.push('Reps must be a number or range (e.g., "8" or "8-12")')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function ExerciseProvider({ children }: ExerciseProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [savedExercises, setSavedExercises] = useLocalStorage<Exercise[]>('exercises', [])
  
  const [state, dispatch] = useReducer(exerciseReducer, {
    ...initialExerciseState,
    exercises: savedExercises,
    isLoading,
    error
  })

  // Sync state changes with localStorage
  useEffect(() => {
    const syncToStorage = async () => {
      try {
        setIsLoading(true)
        // Validate exercises before saving
        const validExercises = state.exercises.filter(validateExercise)
        if (validExercises.length !== state.exercises.length) {
          console.warn('Some exercises failed validation and were not saved')
        }
        await setSavedExercises(validExercises)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to save exercises'))
        console.error('Failed to sync exercises to storage:', err)
      } finally {
        setIsLoading(false)
      }
    }

    syncToStorage()
  }, [state.exercises, setSavedExercises])

  return (
    <ExerciseContext.Provider value={{ 
      state: { 
        ...state, 
        isLoading, 
        error 
      }, 
      dispatch 
    }}>
      {children}
    </ExerciseContext.Provider>
  )
}
