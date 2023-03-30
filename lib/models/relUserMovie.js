'use strict';

const { Model } = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class RelUserMovie extends Model {

    static get tableName() {

        return 'r_user_movie';
    }

    static get joiSchema() {

        return Joi.object({
            id_user: Joi.number().integer().greater(0),
            id_movie: Joi.number().integer().greater(0),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get idColumn() {

        return ['id_user', 'id_movie'];
    }

    $beforeInsert() {

        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    $beforeUpdate() {

        this.updatedAt = new Date();
    }
};
