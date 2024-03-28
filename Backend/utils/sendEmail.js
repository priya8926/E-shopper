const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host : process.env.SMPT_HOST,
        port : process.env.SMPT_PORT,
        service: process.env.SERVICE,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.PASSWORD
        }
    })
    debug: true
  const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail