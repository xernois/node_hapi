'use strict';

const Nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailService extends Service {

    async send(mail) {

        const transporter = Nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jimmy26@ethereal.email',
                pass: 'Rp3ApSAgnWhqPEzpj2'
            }
        });

        console.log('sendmail');

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Welcome" <welcome@localhost.com>', // sender address
            to: mail, // list of receivers
            subject: 'Thanks for registering on our website', // Subject line
            text: 'Welcome to the Film Library website 🎉', // plain text body
            html: 'Welcome to the <b>Film Library</b> website 🎉' // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info));
    }
};
