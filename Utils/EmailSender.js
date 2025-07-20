import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.HOSTER_CLR,
  port: +process.env.PORT_CLR,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.APP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async ({ email, sub, mess }) => {
  try {
    return await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: sub,
      html: mess,
    });
  } catch (error) {
    console.error("Error sending email: ", error.message);
  }
};

export default sendEmail;
