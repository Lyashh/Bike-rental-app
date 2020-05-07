import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("category", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
    })

    .createTable("rent", (table) => {
      table.increments("id").primary();
      table.float("sum");
      table.float("rentTime");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("end_at").defaultTo(null);
    })

    .createTable("bikes", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.float("price").notNullable();
      table.boolean("inRent").notNullable();
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
  return knex.schema
    .dropTable("bikes")
    .dropTable("rent")
    .dropTable("category")
    .dropTable("status");
}
