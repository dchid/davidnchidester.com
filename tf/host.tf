resource "aws_amplify_app" "website" {
  name       = "example"
  repository = "https://github.com/davidnchidester.com/"

  # The default build_spec added by the Amplify Console for React.
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

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

}
