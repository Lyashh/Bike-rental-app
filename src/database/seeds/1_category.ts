import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("category")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("category").insert([
        { id: 1, title: "City bike" },
        { id: 2, title: "Mountain bike" },
        { id: 3, title: "Road Bike" },
      ]);
    });
}
