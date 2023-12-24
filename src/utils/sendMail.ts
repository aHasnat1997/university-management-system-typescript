import nodemailer from 'nodemailer';
import config from '../config';


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: config.email as string,
        pass: config.pass as string,
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMali(sendTo: string, html: string) {
    // send mail with defined transport object
    return await transporter.sendMail({
        from: config.email, // sender address
        to: sendTo, // list of receivers
        subject: 'Done👍', // Subject line
        text: 'Email send...', // plain text body
        html, // html body
    });
}
