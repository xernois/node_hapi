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
}, {
    method: 'post',
    path: '/movie',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                titre: Joi.string().required().min(3).example('titanic').description('Username of the user'),
                description: Joi.string().required().min(8).example('a boat related movie where there is not enough place on a plank for two.').description('the movie description'),
                date: Joi.string().required().min(8).example('1989/05/23').description('the movie release date'),
                realisateur: Joi.string().required().min(8).example('spielberg').description('the movie realisator')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService, mailService, userService  } = request.services();

        const movie = await movieService.create(request.payload);
        const emails = await userService.getAllMail();

        if  (movie && emails?.length) {
            mailService.sendNewMovie(emails, movie);
        }

        if (movie) {
            return h.response(movie).code(201);
        }

        return Boom.badImplementation('Error while creating the movie');
    }
},
{
    method: 'delete',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().min(0).description('The id must be 0 or greater')
            })
        }
    },
    handler: async (request) => {

        const { movieService } = request.services();
        return await movieService.deleteById(request.params.id);
    }
},
{
    method: 'get',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { movieService } = request.services();
        return await movieService.getOne(request.params.id);
    }
},
{
    method: 'patch',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                titre: Joi.string().required().min(3).example('titanic').description('Username of the user'),
                description: Joi.string().required().min(8).example('a boat related movie where there is not enough place on a plank for two.').description('the movie description'),
                date: Joi.string().required().min(8).example('1989/05/23').description('the movie release date'),
                realisateur: Joi.string().required().min(8).example('spielberg').description('the movie realisator')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService, mailService } = request.services();

        const movie = await movieService.patch(request.params.id, request.payload);
        const mails = []; // TODO: get all mails of users that liked the movie

        if (movie && mailService?.length) {
            mailService.sendModifiedMovie(mails, movie);
        }
    }
}
];
