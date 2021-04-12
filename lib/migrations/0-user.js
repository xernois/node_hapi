'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('user', (table) => {

            table.increments('id').primary();
            table.string('username').notNull();
            table.string('password').notNull();
            table.string('email').notNull();
            table.string('scope').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
