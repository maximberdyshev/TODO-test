/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('first_name').notNullable()
    table.string('second_name')
    table.string('surname').notNullable()
    table.string('login').notNullable().unique()
    table.string('password').notNullable()
    table.smallint('department').notNullable().defaultTo(1)
    table
      .foreign('department')
      .references('id')
      .inTable('departments')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.smallint('role').notNullable().defaultTo(1)
    table
      .foreign('role')
      .references('id')
      .inTable('roles')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = (knex) => {
  return knex.schema.dropTable('users')
}

export { up, down }
