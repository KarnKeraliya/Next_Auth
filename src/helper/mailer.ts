import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import {uuid} from 'uuidv4'


export const sendMail = async function({email, emailType, userId}:any){
  try {

    const hashedToken = uuid()
    if(emailType === 'VERIFY'){
      await User.findByIdAndUpdate(userId, {
        $set: {verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000},
      })
    }
    else if(emailType === 'RESET'){
      await User.findByIdAndUpdate(userId, {
        $set: {forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000}
      })
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b0d19409336f2e",
        pass: "e875c0679484fa"
      }
    });

    const emailHtml = emailType === 'VERIFY'? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email
    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`: `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to reset your password
    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
    </p>`

    const options = {
    from: 'keraliyakarn@gmail.com', 
    to: email,
    subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
    html: emailHtml,
    }

    const response = await transport.sendMail(options)

    return response
  } catch (error:any) {
    throw new Error("Node mailer Error:",error.message)
  }
}