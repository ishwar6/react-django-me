
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

def send_email(subject, message, mailer):

    receiver_email = "techdev@thesoftcoders.com"
    sent_by = "myfreeid13@gmail.com"
    message = f"""Mail Sent By : {mailer},
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

        # Login to your Gmail account
        server.login("myfreeid13@gmail.com", "mjbywdnnvwdsvdai")

        # Send the email
        server.send_message(msg)

    print("Email sent successfully!")


