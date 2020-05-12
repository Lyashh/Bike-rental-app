import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("bikes")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("bikes").insert([
        { title: "City bike 1", price: 3.3, category_id: 1 },
        { title: "City bike 2", price: 4.9, category_id: 1 },
        { title: "City bike 3", price: 5, category_id: 1 },

        {
          title: "Mountain bike 1",
          price: 8,
          category_id: 2,
        },
        {
          title: "Mountain bike 2",
          price: 4.2,
          category_id: 2,
        },

        { title: "Road bike 1", price: 9, category_id: 3 },
        { title: "Road bike 2", price: 7.5, category_id: 3 },
      ]);
    });
}
