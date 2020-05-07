import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("bikes")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("bikes").insert([
        { title: "City bike 1", price: 12.3, inRent: false, category_id: 1 },
        { title: "City bike 2", price: 12.9, inRent: false, category_id: 1 },
        { title: "City bike 3", price: 13, inRent: false, category_id: 1 },

        {
          title: "Mountain bike 1",
          price: 28.8,
          inRent: false,
          category_id: 2,
        },
        {
          title: "Mountain bike 2",
          price: 32.2,
          inRent: false,
          category_id: 2,
        },

        { title: "Road bike 1", price: 20, inRent: false, category_id: 3 },
        { title: "Road bike 2", price: 27.5, inRent: false, category_id: 3 },
      ]);
    });
}
