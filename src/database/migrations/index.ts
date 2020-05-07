import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("status", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
    })

    .createTable("category", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
    })

    .createTable("rent", (table) => {
      table.increments("id").primary();
      table.float("sum").notNullable();
      table.float("rentTime").notNullable();
    })

    .createTable("bikes", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.float("price").notNullable();
      table
        .bigInteger("status_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("status")
        .onDelete("CASCADE")
        .index();
      table
        .bigInteger("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("category")
        .onDelete("CASCADE")
        .index();
      table
        .bigInteger("rent_id")
        .unsigned()
        .references("id")
        .inTable("rent")
        .onDelete("CASCADE")
        .index();
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("bikes");
}
