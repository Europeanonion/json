#!/bin/bash

# Set script to exit on error
set -e

# Define project root relative to script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Array of required files and directories
declare -a REQUIRED=(
  "src/components/workouts/WorkoutCard.tsx"
  "src/components/workouts/WorkoutList.tsx"
  "src/components/workouts/__tests__/WorkoutCard.test.tsx"
  "src/components/workouts/__tests__/WorkoutList.test.tsx"
  "src/context/WorkoutContext.tsx"
  "src/context/__tests__/WorkoutContext.test.tsx"
  "src/hooks/useLocalStorage.ts"
  "src/hooks/useWorkouts.ts"
  "src/types/index.ts"
  "src/utils/csvParser.ts"
  "src/utils/validation.ts"
  "src/test/setup.ts"
  "src/styles/theme.ts"
  "vitest.config.ts"
)

# Print header
echo "Workout Tracker Project Structure Verification"
echo "============================================="
echo "Project Root: $PROJECT_ROOT"
echo

# Check each required file
MISSING=0
for file in "${REQUIRED[@]}"; do
  if [ -f "$PROJECT_ROOT/$file" ]; then
    echo "✅ Found: $file"
  else
    echo "❌ Missing: $file"
    MISSING=$((MISSING + 1))
  fi
done

# Display full structure
echo -e "\nCurrent Project Structure:"
if command -v tree &> /dev/null; then
    tree "$PROJECT_ROOT/src" -I 'node_modules|dist'
else
    find "$PROJECT_ROOT/src" -type f -o -type d | sed -e "s#$PROJECT_ROOT/##" -e 's/[^/]*\//  /g'
fi

# Summary
echo -e "\nVerification Summary:"
echo "Total files checked: ${#REQUIRED[@]}"
echo "Missing files: $MISSING"

# Exit with error if files are missing
[ $MISSING -eq 0 ] || exit 1