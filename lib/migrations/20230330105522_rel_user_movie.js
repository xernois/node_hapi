'use strict';

exports.up = async (knex) => {

    if (!await knex.schema.hasTable('r_user_movie')) {

        await knex.schema.createTable('r_user_movie', (table) => {

            table.integer('id_user').unsigned().notNull().references('id').inTable('user');
            table.integer('id_movie').unsigned().notNull().references('id').inTable('movie');
            table.dateTime('updatedAt').defaultTo(knex.fn.now());
            table.dateTime('createdAt').defaultTo(knex.fn.now());
            table.primary(['id_user', 'id_movie']);
        });
    }
};

exports.down = async (knex) => {

    await knex.schema.dropTableIfExists('r_user_movie');
};
