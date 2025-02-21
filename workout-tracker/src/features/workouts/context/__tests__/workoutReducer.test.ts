import { describe, it, expect } from 'vitest'
import { workoutReducer, initialWorkoutState } from '../workoutReducer'
import type { WorkoutAction } from '../../types/workout.types'

describe('workoutReducer', () => {
  it('should return the initial state', () => {
    expect(workoutReducer(initialWorkoutState, {} as WorkoutAction)).toEqual(
      initialWorkoutState
    )
  })

  it('should handle ADD_WORKOUT', () => {
    const newWorkout = {
      id: '1',
      name: 'Test Workout',
      phase: 'Test',
      week: 1,
      exercises: []
    }
    const action: WorkoutAction = {
      type: 'ADD_WORKOUT',
      payload: newWorkout
    }
    const expectedState = {
      ...initialWorkoutState,
      workouts: [newWorkout]
    }
    expect(workoutReducer(initialWorkoutState, action)).toEqual(expectedState)
  })

  it('should handle REMOVE_WORKOUT', () => {
    const initialState = {
      ...initialWorkoutState,
      workouts: [
        {
          id: '1',
          name: 'Test Workout',
          phase: 'Test',
          week: 1,
          exercises: []
        }
      ]
    }
    const action: WorkoutAction = {
      type: 'REMOVE_WORKOUT',
      payload: '1'
    }
    const expectedState = {
      ...initialWorkoutState,
      workouts: []
    }
    expect(workoutReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle UPDATE_WORKOUT', () => {
    const initialState = {
      ...initialWorkoutState,
      workouts: [
        {
          id: '1',
          name: 'Test Workout',
          phase: 'Test',
          week: 1,
          exercises: []
        }
      ]
    }
    const updatedWorkout = {
      id: '1',
      name: 'Updated Workout',
      phase: 'Test',
      week: 1,
      exercises: []
    }
    const action: WorkoutAction = {
      type: 'UPDATE_WORKOUT',
      payload: updatedWorkout
    }
    const expectedState = {
      ...initialWorkoutState,
      workouts: [updatedWorkout]
    }
    expect(workoutReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle SELECT_WORKOUT', () => {
    const workout = {
      id: '1',
      name: 'Test Workout',
      phase: 'Test',
      week: 1,
      exercises: []
    }
    const action: WorkoutAction = {
      type: 'SELECT_WORKOUT',
      payload: workout
    }
    const expectedState = {
      ...initialWorkoutState,
      selectedWorkout: workout
    }
    expect(workoutReducer(initialWorkoutState, action)).toEqual(expectedState)
  })

  it('should handle CLEAR_SELECTED_WORKOUT', () => {
    const initialState = {
      ...initialWorkoutState,
      selectedWorkout: {
        id: '1',
        name: 'Test Workout',
        phase: 'Test',
        week: 1,
        exercises: []
      }
    }
    const action: WorkoutAction = {
      type: 'CLEAR_SELECTED_WORKOUT'
    }
    const expectedState = {
      ...initialWorkoutState,
      selectedWorkout: null
    }
    expect(workoutReducer(initialState, action)).toEqual(expectedState)
  })
    it('should handle SET_ERROR', () => {
        const error = new Error('Test Error');
        const action: WorkoutAction = { type: 'SET_ERROR', payload: error };
        const expectedState = { ...initialWorkoutState, error, isLoading: false };
        expect(workoutReducer(initialWorkoutState, action)).toEqual(expectedState);
    });

    it('should handle SET_LOADING', () => {
        const isLoading = true;
        const action: WorkoutAction = { type: 'SET_LOADING', payload: isLoading };
        const expectedState = { ...initialWorkoutState, isLoading };
        expect(workoutReducer(initialWorkoutState, action)).toEqual(expectedState);
    });
})
