#!/bin/bash

# S3 Bulk Restoration Script
# This script removes ALL delete markers from your S3 bucket, restoring all deleted files
# Usage: ./restore-s3-bucket.sh salesconnect.com.au

BUCKET_NAME="${1}"

if [ -z "$BUCKET_NAME" ]; then
  echo "Usage: $0 <bucket-name>"
  echo "Example: $0 salesconnect.com.au"
  exit 1
fi

echo "==========================================="
echo "S3 Bulk Restoration Script"
echo "==========================================="
echo "Bucket: $BUCKET_NAME"
echo ""
echo "This script will:"
echo "  1. List all delete markers in your bucket"
echo "  2. Remove them to restore all deleted files"
echo ""
read -p "Continue? (yes/no) " -r
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo "Step 1: Fetching all delete markers..."
echo ""

# Create temporary file to store delete markers
TEMP_FILE=$(mktemp)

# List all objects with delete markers using AWS CLI
aws s3api list-object-versions \
  --bucket "$BUCKET_NAME" \
  --query 'DeleteMarkers[*].[Key, VersionId]' \
  --output text > "$TEMP_FILE"

if [ ! -s "$TEMP_FILE" ]; then
  echo "No delete markers found. Your bucket is already clean."
  rm "$TEMP_FILE"
  exit 0
fi

# Count delete markers
MARKER_COUNT=$(wc -l < "$TEMP_FILE")
echo "Found $MARKER_COUNT delete markers to remove."
echo ""

# Process delete markers
COUNTER=0
while IFS=$'\t' read -r KEY VERSION_ID; do
  if [ -z "$KEY" ] || [ -z "$VERSION_ID" ]; then
    continue
  fi

  COUNTER=$((COUNTER + 1))

  # Show progress every 50 items
  if [ $((COUNTER % 50)) -eq 0 ]; then
    echo "Removing delete markers: $COUNTER/$MARKER_COUNT"
  fi

  # Remove the delete marker by specifying the version ID
  aws s3api delete-object \
    --bucket "$BUCKET_NAME" \
    --key "$KEY" \
    --version-id "$VERSION_ID" \
    --output none
done < "$TEMP_FILE"

rm "$TEMP_FILE"

echo ""
echo "==========================================="
echo "✓ Restoration Complete!"
echo "==========================================="
echo "Removed: $COUNTER delete markers"
echo ""
echo "All deleted files have been restored."
echo "Your S3 bucket $BUCKET_NAME is now back to normal."
echo ""
