#!/bin/bash

# Exit on any error
set -e

# JSON file path
JSON_FILE=$1

if [ ! -f "$JSON_FILE" ]; then
    echo "JSON file not found: $JSON_FILE"
    exit 1
fi

PROJECT_COUNT=$(jq '.projects | length' "$JSON_FILE")
echo "Found $PROJECT_COUNT projects in $JSON_FILE"

for i in $(seq 0 $(($PROJECT_COUNT - 1))); do
    
    REPO_URL=$(jq -r ".projects[$i].gitURL" "$JSON_FILE")
    TARGET_DIR=$(jq -r ".projects[$i].directory" "$JSON_FILE")
    
    echo "Processing project $((i+1))/$PROJECT_COUNT: $TARGET_DIR"
    
    # Clone the repository if gitURL is not null
    if [[ "$REPO_URL" != "null" && "$REPO_URL" != "" ]]; then
        echo "Cloning repository $REPO_URL into $TARGET_DIR"
        mkdir -p "$TARGET_DIR"
        git clone "$REPO_URL" "$TARGET_DIR"
    else
        echo "No gitURL provided. Skipping clone for $TARGET_DIR."
    fi
    
    cd "$TARGET_DIR"
    
    echo "Building project in $TARGET_DIR"
    npm install
    npm run build
    
    echo "Removing all files except the build folder"
    find . -mindepth 1 -maxdepth 1 ! -name "build" -exec rm -rf {} +
    
    echo "Moving build output to the root of $TARGET_DIR"
    mv build/* ./
    rm -rf build
    
    cd -
    
    echo "Completed processing for $TARGET_DIR"
done

echo "All projects processed successfully."
