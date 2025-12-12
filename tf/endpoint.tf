# Endpoint for making HTTP requests to the lambda function which handles email form data

##########################
# API Gateway (HTTP API - v2)
##########################

resource "aws_apigatewayv2_api" "contact_api" {
  name          = "contact-form-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_headers = ["Content-Type"]
    allow_methods = ["POST", "OPTIONS"]
    allow_origins = [
      # prod URL
      "https://${var.domain_name}",
      # dev URL
      "https://dev.${aws_amplify_app.website.id}.amplifyapp.com"
    ]
    expose_headers = []
    max_age        = 3600
  }

  tags = {
    Name = "contact-form-api"
  }
}

##########################
# Lambda Integration (HTTP API)
##########################

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.contact_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_form.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

##########################
# Route for POST /contact
##########################

resource "aws_apigatewayv2_route" "contact_route" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

##########################
# Stage (auto-deploy)
##########################

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.contact_api.id
  name        = "prod"
  auto_deploy = true

}

##########################
# Permission: allow API Gateway to invoke Lambda
##########################
# This grants permission for the HTTP API execution ARN for this API for the POST /contact route.

resource "aws_lambda_permission" "apigw_invoke_contact" {
  statement_id  = "AllowApiGatewayInvokeContactForm"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"

  # Use the API execution ARN and restrict to the POST /contact method.
  # execution_arn typically looks like: arn:aws:execute-api:{region}:{account}:{apiId}
  # Append the stage/method/path pattern to scope the permission.
  source_arn = "${aws_apigatewayv2_api.contact_api.execution_arn}/*/POST/contact"
}

##########################
# Outputs
##########################

output "api_invoke_url" {
  description = "Public URL for the contact form API (POST /contact)"
  value       = "${aws_apigatewayv2_stage.prod.invoke_url}/contact"
}

