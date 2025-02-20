import { useContext } from 'react'
import { ExerciseContext } from '../context/ExerciseContext'

export function useExerciseContext() {
  const context = useContext(ExerciseContext)
  
  if (!context) {
    throw new Error('useExerciseContext must be used within an ExerciseProvider')
  }
  
  return context
}
