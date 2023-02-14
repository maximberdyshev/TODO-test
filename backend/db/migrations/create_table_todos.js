/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id')
    table.string('title').notNullable()
    table.string('description').notNullable().defaultTo('Нет описания.')
    table.string('date_create', 10).notNullable()
    table.string('date_update', 10)
    table.string('date_end', 10)
    table.smallint('priority').notNullable().defaultTo(2)
    table
      .foreign('priority')
      .references('id')
      .inTable('priorities')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.smallint('status').notNullable().defaultTo(1)
    table
      .foreign('status')
      .references('id')
      .inTable('status_list')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.smallint('initiator').notNullable()
    table
      .foreign('initiator')
      .references('id')
      .inTable('users')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.smallint('executor').notNullable()
    table
      .foreign('executor')
      .references('id')
      .inTable('users')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = (knex) => {
  return knex.schema.dropTable('todos')
}

export { up, down }
