#!/bin/bash

# Check if the directory name is provided
if [ -z "$1" ]; then
  echo "Please provide a directory name."
  exit 1
fi

# Directory provided as an argument
TARGET_DIR="$1"

# Find and remove all .gitignore files in the specified directory
find "$TARGET_DIR" -maxdepth 1 -type f -name ".gitignore" -exec rm -v {} \;

# Find all src folders and remove specified files within them
find "$TARGET_DIR" -maxdepth 1 -type d -name "src" | while read -r src_dir; do
 FILES_TO_REMOVE=( "App.test.js"  "logo.svg" "reportWebVitals.js" "setupTests.js" )
  for file in "${FILES_TO_REMOVE[@]}"; do
    file_path="$src_dir/$file"
    if [ -f "$file_path" ]; then
      rm -v "$file_path"
    else
      echo "$file_path not found"
    fi
  done
done

# Find all public folders and remove specified files within them
find "$TARGET_DIR" -maxdepth 1 -type d -name "public" | while read -r public_dir; do
    FILES_TO_REMOVE=("favicon.ico" "logo192.png" "logo512.png"  "robots.txt")
    for file in "${FILES_TO_REMOVE[@]}"; do
    file_path="$public_dir/$file"
    if [ -f "$file_path" ]; then
      rm -v "$file_path"
    else
      echo "$file_path not found"
    fi
  done
done

