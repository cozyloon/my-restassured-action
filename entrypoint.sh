#!/bin/bash

set -e

# Input Variables
COLLECTION_PATH="${INPUT_COLLECTION_PATH}"
OUTPUT_DIRECTORY="${INPUT_OUTPUT_DIRECTORY:-./generated-tests}"
ENABLE_ALLURE="${INPUT_ENABLE_ALLURE:-true}"

# Input Validation
if [ ! -f "$COLLECTION_PATH" ]; then
    echo "❌ ERROR: Postman collection not found: $COLLECTION_PATH"
    exit 1
fi

# Ensure output directory exists
mkdir -p "$OUTPUT_DIRECTORY"

# Log inputs
echo "🚀 Converting Postman collection: $COLLECTION_PATH"
echo "📂 Output directory: $OUTPUT_DIRECTORY"

# Execute conversion
node /app/scripts/convert.js "$COLLECTION_PATH" "$OUTPUT_DIRECTORY"

# Display generated files
echo "✅ Generated RestAssured tests:"
ls -R "$OUTPUT_DIRECTORY"

# Set the output for GitHub Action
echo "test_path=$OUTPUT_DIRECTORY" >> "$GITHUB_OUTPUT"

# If Allure is enabled, prepare the environment
if [ "$ENABLE_ALLURE" = "true" ]; then
    echo "🧪 Setting up Allure reporting..."
    mvn clean test -Dallure.results.directory=allure-results
    allure generate allure-results --clean -o allure-report
    echo "✅ Allure report generated!"
fi
