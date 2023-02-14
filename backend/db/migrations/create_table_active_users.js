/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
  return knex.schema.createTable('active_users', (table) => {
    table.bigint('user_id').notNullable()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.string('user_login').notNullable()
    table
      .foreign('user_login')
      .references('login')
      .inTable('users')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.string('session_id').notNullable()
    table.primary['user_id', 'user_login', 'session_id']
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = (knex) => {
  return knex.schema.dropTable('active_users')
}

export { up, down }
