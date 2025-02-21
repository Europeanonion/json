import { describe, it, expect } from 'vitest'
import { exerciseReducer, initialExerciseState } from '../exerciseReducer'
import type { ExerciseAction } from '../../types/exercise.types'
import { ExerciseActionType } from '../../types/exercise.types'

describe('exerciseReducer', () => {
  it('should return the initial state', () => {
    expect(exerciseReducer(initialExerciseState, {} as ExerciseAction)).toEqual(
      initialExerciseState
    )
  })

  it('should handle ADD_EXERCISE', () => {
    const newExercise = {
      id: '1',
      name: 'Test Exercise',
      warmupSets: '2',
      workingSets: '3',
      reps: '8-12',
      rpe: '8',
      rest: '2-3 min',
      substitutions: [],
      notes: 'Test note'
    }
    const action: ExerciseAction = {
      type: ExerciseActionType.ADD_EXERCISE,
      payload: newExercise
    }
    const expectedState = {
      ...initialExerciseState,
      exercises: [newExercise]
    }
    expect(exerciseReducer(initialExerciseState, action)).toEqual(expectedState)
  })

  it('should handle REMOVE_EXERCISE', () => {
    const initialState = {
      ...initialExerciseState,
      exercises: [
        {
          id: '1',
          name: 'Test Exercise',
          warmupSets: '2',
          workingSets: '3',
          reps: '8-12',
          rpe: '8',
          rest: '2-3 min',
          substitutions: [],
          notes: 'Test note'
        }
      ]
    }
    const action: ExerciseAction = {
      type: ExerciseActionType.REMOVE_EXERCISE,
      payload: '1'
    }
    const expectedState = {
      ...initialExerciseState,
      exercises: []
    }
    expect(exerciseReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle UPDATE_EXERCISE', () => {
    const initialState = {
      ...initialExerciseState,
      exercises: [
        {
          id: '1',
          name: 'Test Exercise',
          warmupSets: '2',
          workingSets: '3',
          reps: '8-12',
          rpe: '8',
          rest: '2-3 min',
          substitutions: [],
          notes: 'Test note'
        }
      ]
    }
    const updatedExercise = {
      id: '1',
      name: 'Updated Exercise',
      warmupSets: '1',
      workingSets: '4',
      reps: '10-15',
      rpe: '7',
      rest: '1-2 min',
      substitutions: ['Alt Exercise'],
      notes: 'Updated note'
    }
    const action: ExerciseAction = {
      type: ExerciseActionType.UPDATE_EXERCISE,
      payload: updatedExercise
    }
    const expectedState = {
      ...initialExerciseState,
      exercises: [updatedExercise]
    }
    expect(exerciseReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle SELECT_EXERCISE', () => {
    const exercise = {
      id: '1',
      name: 'Test Exercise',
      warmupSets: '2',
      workingSets: '3',
      reps: '8-12',
      rpe: '8',
      rest: '2-3 min',
      substitutions: [],
      notes: 'Test note'
    }
    const action: ExerciseAction = {
      type: ExerciseActionType.SELECT_EXERCISE,
      payload: exercise
    }
    const expectedState = {
      ...initialExerciseState,
      selectedExercise: exercise
    }
    expect(exerciseReducer(initialExerciseState, action)).toEqual(expectedState)
  })

  it('should handle CLEAR_SELECTED_EXERCISE', () => {
    const initialState = {
      ...initialExerciseState,
      selectedExercise: {
        id: '1',
        name: 'Test Exercise',
        warmupSets: '2',
        workingSets: '3',
        reps: '8-12',
        rpe: '8',
        rest: '2-3 min',
        substitutions: [],
        notes: 'Test note'
      }
    }
    const action: ExerciseAction = {
      type: ExerciseActionType.CLEAR_SELECTED_EXERCISE
    }
    const expectedState = {
      ...initialExerciseState,
      selectedExercise: null
    }
    expect(exerciseReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle SET_ERROR', () => {
    const error = new Error('Test Error')
    const action: ExerciseAction = { type: ExerciseActionType.SET_ERROR, payload: error }
    const expectedState = { ...initialExerciseState, error, isLoading: false }
    expect(exerciseReducer(initialExerciseState, action)).toEqual(expectedState)
  })

  it('should handle SET_LOADING', () => {
    const isLoading = true
    const action: ExerciseAction = { type: ExerciseActionType.SET_LOADING, payload: isLoading }
    const expectedState = { ...initialExerciseState, isLoading }
    expect(exerciseReducer(initialExerciseState, action)).toEqual(expectedState)
  })
})
