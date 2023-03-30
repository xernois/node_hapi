'use strict';

module.exports = [{
    method: 'post',
    path: '/like/{id}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const likedMovieId =  (await userService.getLikes(request.auth.credentials.id)).map((movie) => movie.id);
        if (!likedMovieId?.includes(+request.params.id)) {
            const movie = await userService.like(+request.auth.credentials.id, +request.params.id);
            if (movie) {
                return h.response().code(204);
            }
        }
        else {
            return h.response('You already liked this movie').code(409);
        }

        return h.response('An error occured').code(409);
    }
},{
    method: 'delete',
    path: '/like/{id}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const likedMovieId =  (await userService.getLikes(request.auth.credentials.id)).map((movie) => movie.id);

        if (likedMovieId?.includes(+request.params.id)) {
            const nbrRow = await userService.unlike(+request.auth.credentials.id, +request.params.id);
            if (nbrRow) {
                return h.response().code(204);
            }
        }
        else {
            return h.response('You didn\'t like this movie').code(409);
        }

        return h.response('An error occured').code(409);
    }
},{
    method: 'get',
    path: '/likes',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: (request, h) => {

        const { userService } = request.services();

        return userService.getLikes(request.auth.credentials.id);
    }
}
];
