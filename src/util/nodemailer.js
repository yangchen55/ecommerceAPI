// Use at least Nodemailer v4.1.0
import nodemailer from "nodemailer"
// configure ans send email

const sendEmail = async (emailBody) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });
        // sendEmail
        const info = await transporter.sendMail(emailBody)
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    } catch (error) {
        console.log(error)

    }
}


export const newAccountEmailVerificationEmail = (link, obj) => {
    const emailBody = {
        from: `"feminal clothing", <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "verfiy your email",
        text: `"please follow the link" + ${link}`,
        html: `
        <p>
        hi ${obj.fname}
        </p
        <br>
        <p> please follow the link below to verfiy your new account </p>
        <br>
        hi  <a href=${link}> ${link} </a>

        best regards
        <br>
        yangchen
        `

    };
    sendEmail(emailBody)

}