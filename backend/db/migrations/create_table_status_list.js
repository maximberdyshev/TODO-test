/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
    return knex.schema.createTable('status_list', (table) => {
      table.smallint('id').notNullable()
      table.primary('id')
      table.string('status').notNullable()
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  const down = (knex) => {
    return knex.schema.dropTable('status_list')
  }
  
  export { up, down }
  