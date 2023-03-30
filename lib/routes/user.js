'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');


module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                username: Joi.string().required().min(3).example('John123').description('Username of the user'),
                password: Joi.string().required().min(8).example('123pass').description('Password of the user'),
                email: Joi.string().required().email()
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload);
    }
},
{
    method: 'delete',
    path: '/user/{id}',
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

        const { userService } = request.services();
        return await userService.deleteById(request.params.id);
    }
},
{
    method: 'get',
    path: '/users',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.list();
    }
},
{
    method: 'get',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.getOne(request.params.id);
    }
},
{
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                username: Joi.string().min(3).example('John123').description('Username of the user'),
                password: Joi.string().min(8).example('123pass').description('Password of the user'),
                email: Joi.string().email()
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.patch(request.params.id, request.payload);
    }
},
{
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                email: Joi.string().required().email(),
                password: Joi.string().required().min(8).example('123pass').description('Password of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        const token = await userService.login(request.payload);
        if (token) {
            return h.response({ token }).code(201);
        }

        return Boom.unauthorized('Wrong password or email !');
    }
}];
