/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
    return knex.schema.createTable('roles', (table) => {
      table.smallint('id').notNullable()
      table.primary('id')
      table.string('role').notNullable().unique()
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  const down = (knex) => {
    return knex.schema.dropTable('roles')
  }
  
  export { up, down }
  