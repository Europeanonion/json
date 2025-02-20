#!/bin/bash

# Base project directory
PROJECT_DIR="/workspaces/json/workout-tracker"

# Create directory structure
echo "Creating directory structure..."
mkdir -p $PROJECT_DIR/src/{components,context,hooks,types,utils}/{__tests__,}
mkdir -p $PROJECT_DIR/src/components/{exercises,workouts,layout}/{__tests__,}
mkdir -p $PROJECT_DIR/src/test

# Create core files
echo "Creating core files..."
touch $PROJECT_DIR/src/types/index.ts
touch $PROJECT_DIR/src/context/WorkoutContext.tsx
touch $PROJECT_DIR/src/context/__tests__/WorkoutContext.test.tsx
touch $PROJECT_DIR/src/test/setup.ts

# Create component files
echo "Creating component files..."
touch $PROJECT_DIR/src/components/workouts/WorkoutCard.tsx
touch $PROJECT_DIR/src/components/workouts/WorkoutList.tsx
touch $PROJECT_DIR/src/components/workouts/__tests__/WorkoutCard.test.tsx
touch $PROJECT_DIR/src/components/workouts/__tests__/WorkoutList.test.tsx

# Create config files
echo "Creating config files..."
touch $PROJECT_DIR/vitest.config.ts

# Display the created structure
echo -e "\nCreated folder structure:"
if command -v tree &> /dev/null; then
    tree $PROJECT_DIR/src
else
    find $PROJECT_DIR/src -type d -print | sed -e 's;'$PROJECT_DIR'/src'';.;g' -e 's;[^/]*/;|____;g'
fi