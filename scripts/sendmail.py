import os
import json
import logging
import re
import boto3

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize SES client
ses = boto3.client("ses")

def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event))

    try:
        # Parse input body depending on source (API Gateway or test event)
        if isinstance(event.get("body"), str):
            body = json.loads(event["body"])
        else:
            body = event.get("body", event)

        # Validate form data

        if validate(body) == False:
            return {
                    "statusCode": 400,
                    "body": json.dumps({"message": "Invalid form data"})
            }

        name = body["name"]
        sender = body["email"]
        message = body["message"]
        subject = body["subject"]

        recipient = os.environ["RECIPIENT_EMAIL"]

        # Compose the email
        fullSubject = f"{subject} (from {name})"
        emailBody = f"From: {name} <{sender}>\n\n{message}"

        # Send via SES
        response = ses.send_email(
            Source=recipient,
            Destination={"ToAddresses": [recipient]},
            Message={
                "Subject": {"Data": fullSubject},
                "Body": {"Text": {"Data": emailBody}},
            },
            ReplyToAddresses=[sender],
        )

        logger.info("Email sent successfully: %s", response)

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Email sent successfully!"})
        }

    except Exception as e:
        logger.exception("Error sending email")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

def validate(body: dict) -> bool:

    name = body["name"]
    email = body["email"]
    subject = body["subject"]
    message = body["message"]

    # Null checks
    if not name:
        logger.warning("Validation failed: 'name' field is missing or null.")
        return False

    if not email:
        logger.warning("Validation failed: 'email' field is missing or null.")
        return False

    if not subject:
        logger.warning("Validation failed: 'subject' field is missing or null.")
        return False

    if not message:
        logger.warning("Validation failed: 'message' field is missing or null.")
        return False

    # Length checks
    if len(name.strip()) < 2 or len(name.strip()) > 100:
        logger.warning("Validation failed: 'name' length out of range (2–100).")
        return False

    if len(subject.strip()) < 2 or len(subject.strip()) > 150:
        logger.warning("Validation failed: 'subject' length out of range (2–150).")
        return False

    if len(message.strip()) < 5 or len(message.strip()) > 5000:
        logger.warning("Validation failed: 'message' length out of range (5–5000).")
        return False

    # Email format check
    email_pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    if not re.match(email_pattern, email):
        logger.warning(f"Validation failed: 'email' does not match regex. Value: {email}")
        return False

    # Passed all checks
    return True, ""
