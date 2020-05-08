import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("rent")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("rent").insert([{ id: 1, sum: 0, double_price: false }]);
    });
}
