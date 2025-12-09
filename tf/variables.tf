variable "domain_name" {
  type        = string
  description = "The domain name for the website"
}

variable "region" {
	type = string
	description = "AWS region for hosting"
}

variable "github_user" {
  description = "GitHub username"
  type        = string
}

variable "github_token" {
  description = "Github API token"
  type        = string
  sensitive   = true
}

variable "email" {
  description = "email"
  type        = string
  sensitive   = true
}
