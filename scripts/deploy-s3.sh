#!/bin/sh
set -eu

BUCKET="${S3_BUCKET:-60th-birthday}"
KEY="${S3_KEY:-index.html}"
REGION="${AWS_REGION:-us-east-1}"
EXPIRES_IN="${EXPIRES_IN:-604800}"

BASE_KEY="${KEY%/*}"
if [ "$BASE_KEY" = "$KEY" ]; then BASE_KEY=""; else BASE_KEY="${BASE_KEY}/"; fi
MORE_URL="$(aws s3 presign "s3://${BUCKET}/${BASE_KEY}more/index.html" --expires-in "$EXPIRES_IN" --region "$REGION")"
CONTROL_URL="$(aws s3 presign "s3://${BUCKET}/${BASE_KEY}control/index.html" --expires-in "$EXPIRES_IN" --region "$REGION")"
export MORE_URL CONTROL_URL

npm run build
aws s3 cp "dist/celebrating-sixty.html" "s3://${BUCKET}/${KEY}" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "no-store" \
  --region "$REGION"
aws s3 cp "dist/more/index.html" "s3://${BUCKET}/${BASE_KEY}more/index.html" --content-type "text/html; charset=utf-8" --cache-control "no-store" --region "$REGION"
aws s3 cp "dist/control/index.html" "s3://${BUCKET}/${BASE_KEY}control/index.html" --content-type "text/html; charset=utf-8" --cache-control "no-store" --region "$REGION"
echo "Original experience:"
aws s3 presign "s3://${BUCKET}/${KEY}" --expires-in "$EXPIRES_IN" --region "$REGION"
echo "More possibilities:"
echo "$MORE_URL"
echo "Planning view:"
echo "$CONTROL_URL"
