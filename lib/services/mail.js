'use strict';

const Nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailService extends Service {

    constructor() {

        super();
        this.transporter = Nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    sendWelcome(mail) {

        this.send({
            from: `"Welcome" <${process.env.MAIL_USER}>`, // sender address
            to: mail, // list of receivers
            subject: 'Thanks for registering on our website', // Subject line
            text: 'Welcome to the Film Library website 🎉', // plain text body
            html: 'Welcome to the <b>Film Library</b> website 🎉' // html body
        }, 'Welcome Email');
    }

    sendNewMovie(mail, movie) {

        this.send({
            from: `"New movie" <${process.env.MAIL_USER}>`, // sender address
            to: 'no-reply@localhost.com',
            bcc: mail, // list of receivers
            subject: 'new: ' + movie.titre, // Subject line
            text: `The movie "${movie.titre}" has been added`, // plain text body
            html: `The movie <b>"${movie.titre}"</b> has been added` // html body
        }, 'New movie available Email');
    }

    sendModifiedMovie(mail, movie) {

        this.send({
            from: `"Modified Movie" <${process.env.MAIL_USER}>`, // sender address
            to: 'no-reply@localhost.com',
            cc: mail, // list of receivers
            //bcc: mail, // list of receivers
            subject: 'edit: ' + movie.titre, // Subject line
            text: `The movie "${movie.titre}" has been modified`, // plain text body
            html: `The movie <b>"${movie.titre}"</b> has been modified` // html body
        }, 'Movie Modified Email');
    }

    async send(mailOption, description) {

        // send mail with defined transport object
        const info = await this.transporter.sendMail(mailOption);

        console.group(description);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info));
        console.groupEnd();
    }
};
