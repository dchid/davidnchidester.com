resource "aws_amplify_app" "website" {
  name       = var.domain_name
  repository = "https://github.com/${var.github_user}/${var.domain_name}"
  oauth_token                 = var.github_token 
  platform                    = "WEB"
  enable_auto_branch_creation = true

  build_spec = <<-EOT
    version: 2.0
    frontend:
      phases:
        build:
          commands:
            - ""
      artifacts:
        baseDirectory: /src
        files:
          - '**/*'
      cache:
        paths: []
  EOT

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.website.id
  branch_name = "main"
}

resource "aws_amplify_domain_association" "domain_association" {
  app_id      = aws_amplify_app.website.id
  domain_name = var.domain_name

  # https://davidnchidester.com
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # www subdomain
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}


