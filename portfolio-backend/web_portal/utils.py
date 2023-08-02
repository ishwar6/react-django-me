
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

import os
import sys

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