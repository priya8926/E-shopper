const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host : process.env.SMPT_HOST,
        port : process.env.SMPT_PORT,
        service: process.env.SERVICE,
        auth: {
            user: "priyapatel.892002@gmail.com",
            pass: "rtkv ponx ysvt ivht"
        }
    })
  const mailOptions = {
        from: "priyapatel.892002@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail  