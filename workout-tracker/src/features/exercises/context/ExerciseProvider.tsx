import { useReducer, useEffect, useState } from 'react'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import { ExerciseContext } from './ExerciseContext'
import { exerciseReducer, initialExerciseState } from './exerciseReducer'
import type { Exercise } from '../types/exercise.types'

interface ExerciseProviderProps {
  children: React.ReactNode
}

const validateExercise = (exercise: Exercise): boolean => {
  return Boolean(
    exercise.id &&
    exercise.name &&
    typeof exercise.name === 'string' &&
    exercise.name.length > 0
  )
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
