resource "aws_s3_bucket" "host_bucket" {
  bucket = var.bucket_name
}

# for logging
resource "aws_s3_bucket" "log_bucket" {
  bucket = "logs.${var.bucket_name}"
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

resource "aws_s3_bucket_public_access_block" "host_bucket" {
  bucket = aws_s3_bucket.host_bucket.id

  block_public_policy     = false
  restrict_public_buckets = false
  block_public_acls       = true 
  ignore_public_acls      = true 
}

resource "aws_s3_bucket_policy" "static_web_host_policy" {
  bucket = aws_s3_bucket.host_bucket.id

  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = [
          aws_s3_bucket.host_bucket.arn,
          "${aws_s3_bucket.host_bucket.arn}/*",
        ]
      },
    ]
  })
}
