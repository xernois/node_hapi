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
                user: 'fae.luettgen31@ethereal.email',
                pass: 'XYYTRESkJD7w7vhtW4'
            }
        });
    }

    sendWelcome(mail) {

        this.send({
            from: '"Welcome" <no-reply@localhost.com>', // sender address
            to: mail, // list of receivers
            subject: 'Thanks for registering on our website', // Subject line
            text: 'Welcome to the Film Library website 🎉', // plain text body
            html: 'Welcome to the <b>Film Library</b> website 🎉' // html body
        }, 'Welcome Email');
    }

    sendNewMovie(mail, movie) {

        this.send({
            from: '"Welcome" <new.movie@localhost.com>', // sender address
            to: 'new.movie@localhost.com',
            bcc: mail, // list of receivers
            subject: 'new: ' + movie.titre, // Subject line
            text: `The movie "${movie.titre}" has been added`, // plain text body
            html: `The movie <b>"${movie.titre}"</b> has been added` // html body
        }, 'New movie available Email');
    }

    sendModifiedMovie(mail, movie) {

        this.send({
            from: '"Modified Movie" <no-reply@localhost.com>', // sender address
            to: 'no-reply@localhost.com',
            bcc: mail, // list of receivers
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
