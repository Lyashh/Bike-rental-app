import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("category", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
    })

    .createTable("bikes", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.float("price").notNullable();
      table.boolean("available ").defaultTo(true).notNullable();
      table
        .bigInteger("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("category")
        .onDelete("CASCADE")
        .index();
    })

    .createTable("bikesToRents", (table) => {
      table.increments("id").primary();
      table
        .bigInteger("bike_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("bikes")
        .onDelete("CASCADE")
        .index();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTable("bikesToRents")
    .dropTable("bikes")
    .dropTable("category");
}
