type MailMessage = {
  to: string;
  subject: string;
  text: string;
};

export async function sendMail(message: MailMessage) {
  if (!process.env.SMTP_HOST) {
    console.info("Email delivery is not configured yet.", message);
    return { queued: false };
  }

  // SMTP delivery will be wired here when the production email provider is ready.
  console.info("Email provider pending configuration.", message);
  return { queued: false };
}
