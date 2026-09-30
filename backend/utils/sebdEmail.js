const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(to, token) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Email Verification",
    html: `<h1>Click on the link to verify your email</h1>
    <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>`,
  });
}

module.exports = { sendVerificationEmail };