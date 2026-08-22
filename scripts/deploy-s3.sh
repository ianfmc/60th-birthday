#!/bin/sh
set -eu

BUCKET="${S3_BUCKET:-60th-birthday}"
KEY="${S3_KEY:-index.html}"
REGION="${AWS_REGION:-us-east-1}"
EXPIRES_IN="${EXPIRES_IN:-604800}"

npm run build
aws s3 cp "dist/celebrating-sixty.html" "s3://${BUCKET}/${KEY}" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "no-store" \
  --region "$REGION"
aws s3 presign "s3://${BUCKET}/${KEY}" --expires-in "$EXPIRES_IN" --region "$REGION"
