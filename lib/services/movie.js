'use strict';

const Nodemailer = require('nodemailer');
const {
    Service
} = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    list() {

        const { Movie } = this.server.models();
        return Movie.query();
    }

};
