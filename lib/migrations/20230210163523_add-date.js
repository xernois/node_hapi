'use strict';

exports.up = async (knex) => {

    await knex.schema.alterTable('movie', (table) => {

        table.dateTime('updatedAt').defaultTo(knex.fn.now());
        table.dateTime('createdAt').defaultTo(knex.fn.now());
    });

    await knex.schema.alterTable('user', (table) => {

        table.dateTime('updatedAt').defaultTo(knex.fn.now());
        table.dateTime('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = async (knex) => {

    await knex.schema.alterTable('movie', (table) => {

        table.dropColumn('updatedAt');
        table.dropColumn('createdAt');
    });

    await knex.schema.alterTable('user', (table) => {

        table.dropColumn('updatedAt');
        table.dropColumn('createdAt');
    });
};
