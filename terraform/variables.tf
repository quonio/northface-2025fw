variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "tnf-maternity-staging"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "bucket_name" {
  description = "S3 bucket name for hosting"
  type        = string
  default     = ""  # 自動生成される
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "staging"
}