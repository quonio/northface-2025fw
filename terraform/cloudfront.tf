# CloudFront Function for directory index redirect
resource "aws_cloudfront_function" "redirect_to_index" {
  name    = "${var.project_name}-redirect-to-index"
  runtime = "cloudfront-js-1.0"
  code    = <<EOF
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // /special/maternity へのアクセスを /special/maternity/index.html にリダイレクト
    if (uri === '/special/maternity') {
        request.uri = '/special/maternity/index.html';
    }
    
    return request;
}
EOF
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.project_name} distribution"
  default_root_object = "special/maternity/index.html"

  origin {
    domain_name              = aws_s3_bucket.hosting.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_id                = "S3-${aws_s3_bucket.hosting.id}"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.hosting.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # /special/maternity/ へのアクセスをindex.htmlにリダイレクト
  ordered_cache_behavior {
    path_pattern     = "/special/maternity"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.hosting.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.redirect_to_index.arn
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # アセットファイル用のキャッシュ設定
  ordered_cache_behavior {
    path_pattern     = "/static/full/tnf/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.hosting.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 604800  # 7日間
    max_ttl                = 31536000 # 1年
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name        = var.project_name
    Environment = var.environment
  }
}