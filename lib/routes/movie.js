'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');


module.exports = [{
    method: 'get',
    path: '/movies',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { movieService } = request.services();
        return await movieService.list();
    }
}];
