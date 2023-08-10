
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
from django.utils.text import slugify
import uuid
import os
import sys
import logging

logger = logging.getLogger(__name__)

from dotenv import load_dotenv

load_dotenv()

def send_email(subject, name, message, mailer):

    receiver_email = os.getenv('RECEIVER_MAIL_ID')
    sent_by = os.getenv('SEND_BY_MAIL_ID')
    sent_by_password = os.getenv('SEND_BY_MAIL_PASSWORD')
    message = f"""
Mail Sent By : {mailer}
Name of person : {name}

{message}"""
    # Create a multipart message object
    msg = MIMEMultipart()
    msg["From"] = sent_by
    msg["To"] = receiver_email
    msg["Subject"] = subject

    # Attach the message to the email
    msg.attach(MIMEText(message, "plain"))

    # Set up the SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    # Start the SMTP session
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()

        # Login to Gmail account
        server.login(sent_by, sent_by_password)

        # Send the email
        server.send_message(msg)

    print("Email sent successfully!")


def generate_unique_6_length_character():
    # Generate unique uuid for slug field
    unique_id = str(uuid.uuid4())
    unique_6_length_character = unique_id[:6]
    
    return unique_6_length_character



def generate_unique_slug_value(value):
    slug = slugify(value)
    # Check if the generated slug already exists
    slug = f"{slug}-{generate_unique_6_length_character()}"
    
    return slug