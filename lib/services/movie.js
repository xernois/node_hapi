'use strict';

const {
    Service
} = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {


    getUser(id) {

        const { RelUserMovie, Movie } = this.server.models();

        const rel = RelUserMovie.query().select('id_user').where('id_movie', id);
        const user = Movie.query().whereIn('id', rel);

        return user;

    }

    list() {

        const { Movie } = this.server.models();
        return Movie.query();
    }

    getOne(id) {

        const { Movie } = this.server.models();

        return Movie.query().findById(id);
    }

    create(movie) {

        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }

    async patch(id, payload) {

        const { Movie } = this.server.models();

        const dbMovie = await Movie.query().findById(id);

        const updatedMovie = {
            titre: payload.titre ?? dbMovie.titre,
            description: payload.description ?? dbMovie.description,
            date: payload.date ?? dbMovie.date,
            realisateur: payload.realisateur ?? dbMovie.realisateur
        };

        return Movie.query().patchAndFetchById(id, updatedMovie);
    }
};
