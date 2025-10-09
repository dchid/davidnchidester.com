##########################
# Lambda IAM Role & Policy
##########################

resource "aws_iam_role" "lambda_role" {
  name = "contact_form_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# Attach permissions for SES + logging
resource "aws_iam_role_policy" "lambda_policy" {
  name = "contact_form_lambda_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["ses:SendEmail", "ses:SendRawEmail"]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

##########################
# Lambda Function
##########################

# Zip your lambda code (Python example) before applying:
# zip function.zip lambda_function.py

resource "aws_lambda_function" "contact_form" {
  function_name = "contact_form_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.12"
  filename      = "function.zip"
  timeout       = 10

  environment {
    variables = {
      RECIPIENT_EMAIL = "your_email@example.com"
    }
  }

  # Optional — use to re-upload on code changes
  source_code_hash = filebase64sha256("function.zip")
}

##########################
# Lambda Permission
##########################

resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_api.execution_arn}/*/*"
}
