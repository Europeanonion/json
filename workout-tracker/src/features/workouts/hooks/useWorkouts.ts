import { useEffect } from 'react'
import { useWorkoutContext } from './useWorkoutContext'
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage'
import type { Workout } from '../types/workout.types'
import type { Exercise } from '../../exercises/types/exercise.types'

export const useWorkouts = () => {
  const { state, dispatch } = useWorkoutContext()
  const [storedWorkouts, setStoredWorkouts] = useLocalStorage<Workout[]>('workouts', [])
  const [storedExercises] = useLocalStorage<Exercise[]>('exercises', [])

  // Load initial workouts
  useEffect(() => {
    if (storedWorkouts.length && !state.workouts.length) {
      storedWorkouts.forEach(workout => 
        dispatch({ type: 'ADD_WORKOUT', payload: workout })
      )
    }
  }, [storedWorkouts, state.workouts.length, dispatch])

  // Sync workouts when exercises change
  useEffect(() => {
    const availableExerciseIds = new Set(storedExercises.map(e => e.id))
    
    state.workouts.forEach(workout => {
      const hasDeletedExercises = workout.exercises.some(
        exercise => !availableExerciseIds.has(exercise.id)
      )

      if (hasDeletedExercises) {
        const updatedWorkout = {
          ...workout,
          exercises: workout.exercises.filter(exercise => 
            availableExerciseIds.has(exercise.id)
          )
        }
        dispatch({ type: 'UPDATE_WORKOUT', payload: updatedWorkout })
      }
    })
  }, [storedExercises, state.workouts, dispatch])

  return { 
    workouts: state.workouts,
    addWorkout: (workout: Workout) => {
      if (!workout.exercises?.length) {
        throw new Error('Workout must contain at least one exercise')
      }
      dispatch({ type: 'ADD_WORKOUT', payload: workout })
    },
    updateWorkout: (workout: Workout) => {
      if (!workout.exercises?.length) {
        throw new Error('Workout must contain at least one exercise')
      }
      dispatch({ type: 'UPDATE_WORKOUT', payload: workout })
    },
    removeWorkout: (id: string) => dispatch({ type: 'REMOVE_WORKOUT', payload: id }),
    selectWorkout: (workout: Workout) => dispatch({ type: 'SELECT_WORKOUT', payload: workout }),
    clearSelectedWorkout: () => dispatch({ type: 'CLEAR_SELECTED_WORKOUT' })
  }
}
