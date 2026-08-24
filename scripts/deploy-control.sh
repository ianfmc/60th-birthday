#!/bin/sh
set -eu

BUCKET="${S3_BUCKET:-60th-birthday}"
REGION="${AWS_REGION:-us-east-1}"

npm run build
aws s3 cp "dist/control/index.html" "s3://${BUCKET}/control/index.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "no-store" \
  --region "$REGION"
