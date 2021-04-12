'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('movie', (table) => {

            table.increments('id').primary();
            table.string('titre').notNull();
            table.text('description').notNull();
            table.dateTime('date').notNull();
            table.string('realisateur').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('movie');
    }
};
