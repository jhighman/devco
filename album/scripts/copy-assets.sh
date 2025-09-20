#!/bin/bash

# Script to copy necessary assets from the original location to the album/public directory

# Create directories if they don't exist
mkdir -p album/public/assets/images/pss
mkdir -p album/public/music

# Copy SVG files
echo "Copying SVG files..."
cp assets/images/pss/*svg album/public/assets/images/pss/

# Copy PNG files
echo "Copying PNG files..."
cp assets/images/pss/*png album/public/assets/images/pss/

# Copy music files
echo "Copying music files..."
cp music/*mp3 album/public/music/

echo "Assets copied successfully!"