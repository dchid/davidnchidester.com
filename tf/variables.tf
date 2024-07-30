variable "domain_name" {
  type        = string
  description = "The domain name for the website"
}

variable "bucket_name" {
	type = string
	description = "Name of the s3 bucket"
}

variable "region" {
	type = string
	description = "AWS region for hosting"
}
