export interface Exercise {
  id: string
  name: string
  warmupSets: string
  workingSets: string
  reps: string
  rpe: string
  rest: string
  substitutions: readonly string[]
  notes: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

export const isExercise = (exercise: unknown): exercise is Exercise => {
  const e = exercise as Exercise
  return (
    typeof e?.id === 'string' &&
    typeof e?.name === 'string' &&
    typeof e?.warmupSets === 'string' &&
    typeof e?.workingSets === 'string' &&
    typeof e?.reps === 'string' &&
    typeof e?.rpe === 'string' &&
    typeof e?.rest === 'string' &&
    Array.isArray(e?.substitutions) &&
    typeof e?.notes === 'string'
  )
}

export interface ExerciseState {
  readonly exercises: ReadonlyArray<Exercise>
  readonly selectedExercise: Exercise | null
  readonly isLoading: boolean
  readonly error: Error | null
  readonly lastUpdated?: Date
}

export const enum ExerciseActionType {
  ADD_EXERCISE = 'ADD_EXERCISE',
  REMOVE_EXERCISE = 'REMOVE_EXERCISE',
  UPDATE_EXERCISE = 'UPDATE_EXERCISE',
  SELECT_EXERCISE = 'SELECT_EXERCISE',
  CLEAR_SELECTED_EXERCISE = 'CLEAR_SELECTED_EXERCISE',
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING'
}

export type ExerciseAction =
  | { type: ExerciseActionType.ADD_EXERCISE; payload: Exercise }
  | { type: ExerciseActionType.REMOVE_EXERCISE; payload: string }
  | { type: ExerciseActionType.UPDATE_EXERCISE; payload: Exercise }
  | { type: ExerciseActionType.SELECT_EXERCISE; payload: Exercise }
  | { type: ExerciseActionType.CLEAR_SELECTED_EXERCISE }
  | { type: ExerciseActionType.SET_ERROR; payload: Error }
  | { type: ExerciseActionType.SET_LOADING; payload: boolean }

export interface ExerciseContextValue {
  state: ExerciseState
  dispatch: React.Dispatch<ExerciseAction>
}
