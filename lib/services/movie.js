'use strict';

const {
    Service
} = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

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
        const { mailService } = this.server.services();
        mailService.send(movie.email);
        movie.password = Encrypt.sha1(movie.password);

        return Movie.query().insertAndFetch(movie);
    }

    async patch(id, payload) {

        const { Movie } = this.server.models();

        const dbMovie = await User.query().findById(id);

        const updatedMovie = {
            titre: payload.titre ?? dbUser.titre,
            description: payload.description ?? dbUser.description,
            date: payload.date ?? dbUser.date,
            realisateur: payload.realisateur ?? dbUser.realisateur,
        };

        return Movie.query().patchAndFetchById(id, updatedMovie);
    }
};
