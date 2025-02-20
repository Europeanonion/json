import { useReducer, useEffect } from 'react'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import { ExerciseContext } from './ExerciseContext'
import { exerciseReducer, initialExerciseState } from './exerciseReducer'
import type { Exercise } from '../types/exercise.types'

interface ExerciseProviderProps {
  children: React.ReactNode
}

export function ExerciseProvider({ children }: ExerciseProviderProps) {
  const [savedExercises, setSavedExercises] = useLocalStorage<Exercise[]>('exercises', [])
  const [state, dispatch] = useReducer(exerciseReducer, {
    ...initialExerciseState,
    exercises: savedExercises
  })

  // Sync state changes with localStorage
  useEffect(() => {
    setSavedExercises(state.exercises)
  }, [state.exercises, setSavedExercises])

  return (
    <ExerciseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  )
}
