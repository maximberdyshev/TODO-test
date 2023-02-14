/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
    return knex.schema.createTable('priorities', (table) => {
      table.smallint('id').notNullable()
      table.primary('id')
      table.string('priority').notNullable()
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  const down = (knex) => {
    return knex.schema.dropTable('priorities')
  }
  
  export { up, down }
  