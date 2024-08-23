#!/bin/bash

# Find and remove all .gitignore files in the current directory and its subdirectories
find ./*/ -type f -name ".gitignore" -exec rm -v {} \;

# Find all src folders and remove specified files within them
find . -type d -name "src" | while read -r src_dir; do
 FILES_TO_REMOVE=( "App.css" "App.test.js" "index.css" "logo.svg" "reportWebVitals.js" "setupTests.js" )
  for file in "${FILES_TO_REMOVE[@]}"; do
    file_path="$src_dir/$file"
    if [ -f "$file_path" ]; then
      rm -v "$file_path"
    else
      echo "$file_path not found"
    fi
  done
done


find . -type d -name "public" | while read -r public_dir; do
    FILES_TO_REMOVE=("favicon.ico" "logo192.png" "logo512.png" "manifest.json" "robots.txt")
    for file in "${FILES_TO_REMOVE[@]}"; do
    file_path="$public_dir/$file"
    if [ -f "$file_path" ]; then
      rm -v "$file_path"
    else
      echo "$file_path not found"
    fi
  done
done
