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
      table
        .bigInteger("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("category")
        .onDelete("CASCADE")
        .index();
    })
    .createTable("rent", (table) => {
      table.increments("id").primary();
      table.float("sum");
      table.boolean("double_price").defaultTo(false).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("end_at").defaultTo(null);
      table
        .bigInteger("bike_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("bikes")
        .onDelete("CASCADE")
        .index();
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("rent").dropTable("bikes").dropTable("category");
}
