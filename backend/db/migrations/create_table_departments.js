/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
    return knex.schema.createTable('departments', (table) => {
      table.smallint('id').notNullable()
      table.primary('id')
      table.string('department').notNullable().unique()
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  const down = (knex) => {
    return knex.schema.dropTable('departments')
  }
  
  export { up, down }
  