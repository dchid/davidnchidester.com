# Endpoint for making HTTP requests to the lambda function which handles email form data

##########################
# API Gateway (HTTP API)
##########################

resource "aws_apigatewayv2_api" "contact_api" {
  name          = "contact-form-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_headers = ["Content-Type"]
    allow_methods = ["POST", "OPTIONS"]
    allow_origins = ["https://davidnchidester.com"]
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.contact_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_form.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact_route" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.contact_api.id
  name        = "prod"
  auto_deploy = true
}

##########################
# Outputs
##########################

output "api_invoke_url" {
  description = "Public URL for the contact form API"
  value       = "${aws_apigatewayv2_stage.prod.invoke_url}/contact"
}

