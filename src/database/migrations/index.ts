import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("bikes", (table) => {
    table.increments("id").primary();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("bikes");
}
