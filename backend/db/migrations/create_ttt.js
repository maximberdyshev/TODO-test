/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// тестируем создание таблиц
const up = (knex) => {
    return knex.schema.createTable('ttt', (table) => {
      table.string('helloworld', 10)
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  const down = (knex) => {
    return knex.schema.dropTable('ttt')
  }
  
  export { up, down }
  