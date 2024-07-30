resource "aws_s3_bucket" "host_bucket" {
  bucket = var.bucket_name
}

# for logging
resource "aws_s3_bucket" "log_bucket" {
  bucket = "logs.${var.bucket_name}"
}

# For WWW subdomain
resource "aws_s3_bucket" "www_bucket" {
  bucket = "www.${var.bucket_name}"
}

resource "aws_s3_bucket_logging" "bucket_logging" {
  bucket = aws_s3_bucket.host_bucket.id

  target_bucket = aws_s3_bucket.log_bucket.id
  target_prefix = "root/"
}

resource "aws_s3_bucket_website_configuration" "web_config" {
  bucket = aws_s3_bucket.host_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_website_configuration" "www_config"{
  bucket = aws_s3_bucket.www_bucket.id
  redirect_all_requests_to {
    host_name = "https://${var.domain_name}"
  }
}

resource "aws_s3_bucket_public_access_block" "host_bucket" {
  bucket = aws_s3_bucket.host_bucket.id

  block_public_policy     = false
  restrict_public_buckets = false
  block_public_acls       = true 
  ignore_public_acls      = true 
}

resource "aws_s3_bucket_policy" "static_web_host_policy" {
  bucket = aws_s3_bucket.host_bucket.id
  policy = data.aws_iam_policy_document.static_web_host_policy.json
}

resource "aws_s3_bucket_policy" "static_www_web_host_policy" {
  bucket = aws_s3_bucket.www_bucket.id
  policy = data.aws_iam_policy_document.static_www_web_host_policy.json
}

data "aws_iam_policy_document" "static_web_host_policy" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject"
    ]
    resources = [
      aws_s3_bucket.host_bucket.arn,
      "${aws_s3_bucket.host_bucket.arn}/*",
    ]
  }
}

data "aws_iam_policy_document" "static_www_web_host_policy" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject"
    ]
    resources = [
      aws_s3_bucket.www_bucket.arn,
      "${aws_s3_bucket.www_bucket.arn}/*",
    ]
  }
}

