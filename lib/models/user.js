'use strict';

const Joi = require('joi');
const {
    Model
} = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            username: Joi.string().min(3).example('John123').description('Username of the user'),
            password: Joi.string().min(8).example('123pass').description('Password of the user'),
            email: Joi.string().email(),
            scope: Joi.array(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get jsonAttributes() {

        return ['scope'];
    }


    $beforeInsert() {

        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
        this.scope = ['user'];

    }

    $beforeUpdate() {

        this.updatedAt = new Date();
    }
};
