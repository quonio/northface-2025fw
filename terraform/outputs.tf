output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.hosting.id
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.distribution.id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.distribution.domain_name
}

output "website_url" {
  description = "URL to access the website"
  value       = "https://${aws_cloudfront_distribution.distribution.domain_name}"
}

output "deployment_commands" {
  description = "Commands to deploy the website"
  value       = <<EOF

# デプロイコマンド:

# 環境変数を設定
export BUCKET_NAME=${aws_s3_bucket.hosting.id}
export DISTRIBUTION_ID=${aws_cloudfront_distribution.distribution.id}

# デプロイ実行
pnpm deploy:staging

# または個別にコマンド実行:

# アセットをアップロード
aws s3 sync delivery/web/template/ja/full/page/static/full/tnf/ s3://${aws_s3_bucket.hosting.id}/static/full/tnf/ --delete

# HTMLをアップロード
aws s3 cp delivery/web/template/ja/full/page/tnf/index.html s3://${aws_s3_bucket.hosting.id}/special/maternity/index.html

# CloudFrontキャッシュ無効化
aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.distribution.id} --paths "/*"
EOF
}