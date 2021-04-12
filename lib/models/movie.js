'use strict';

const { Model } = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string(),
            description: Joi.string(),
            date: Joi.date(),
            réalisateur: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert() {

        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    $beforeUpdate() {

        this.updatedAt = new Date();
    }
};
