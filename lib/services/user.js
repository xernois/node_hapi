'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@xernois/iut-encrypt');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {


    getLikes(id) {

        const { RelUserMovie, Movie } = this.server.models();

        const rel = RelUserMovie.query().select('id_movie').where('id_user', id);
        const movie = Movie.query().whereIn('id', rel);

        return movie;
    }

    async like(id_user, id_movie) {

        const { RelUserMovie, Movie } = this.server.models();

        await RelUserMovie.query().insert({ id_user, id_movie });

        return Movie.query().findById(id_movie);
    }

    unlike(idUser, idMovie) {

        const { RelUserMovie } = this.server.models();
        console.log(idUser, idMovie);
        return RelUserMovie.query().deleteById([idUser, idMovie]);
    }

    async getAllMail() {

        const { User } = this.server.models();

        return (await User.query()).map((user) => user.email);
    }

    getOne(id) {

        const { User } = this.server.models();

        return User.query().findById(id);
    }

    create(user) {

        const { User } = this.server.models();
        const { mailService } = this.server.services();
        mailService.sendWelcome(user.email);
        user.password = Encrypt.sha1(user.password);

        return User.query().insertAndFetch(user);
    }

    list() {

        const { User } = this.server.models();

        return User.query();
    }

    deleteById(id) {

        const { User } = this.server.models();

        return User.query().deleteById(id);
    }

    async patch(id, payload) {

        const { User } = this.server.models();

        const dbUser = await User.query().findById(id);

        const updatedUser = {
            username: payload.username ?? dbUser.username,
            email: payload.email ?? dbUser.email,
            password: (payload.password ? Encrypt.sha1(payload.password) : dbUser.password)
        };

        return User.query().patchAndFetchById(id, updatedUser);
    }

    async login(auth, reply) {

        const { User } = this.server.models();

        const user = await User.query().findOne({
            'email': auth.email,
            'password': Encrypt.sha1(auth.password)
        });

        const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                ...user
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );


        return user ? token : null;
    }

};
