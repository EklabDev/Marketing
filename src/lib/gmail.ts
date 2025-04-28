
import nodemailer from 'nodemailer'
// Create a transporter using Gmail SMT
// import { google } from 'googleapis';
// Setup JWT client
// const jwtClient = new google.auth.JWT(
//   process.env.GMAIL_APP_CLIENT_ID, // Service account email (xxx@xxx.iam.gserviceaccount.com)
//   undefined,
//   (process.env.GMAIL_PRIVATE_KEY??"").replace(/\\n/gm, '\n'),
//   ['https://mail.google.com/'],
//   process.env.GMAIL_USER  // <--- The real user you are sending on behalf of (e.g., edward.wong@eklab.xyz)
// );

// Generate Access Token
// await jwtClient.authorize();
// const { token } = await jwtClient.getAccessToken();
// console.log(token)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      serviceClient: process.env.GMAIL_APP_CLIENT_ID,
      privateKey:(process.env.GMAIL_PRIVATE_KEY??"").replace(/\\n/gm, '\n')
    }
  });

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    await transporter.verify()
    const mailOptions = {
      from: process.env.GMAIL_FROM_EMAIL,
      to,
      subject,
      html: body
    }

    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
} 