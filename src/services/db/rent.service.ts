import MainDatabaseService from "./main.service";

export default class RentService extends MainDatabaseService {
  private timeDiffQuery: string;
  constructor() {
    super();
    this.timeDiffQuery =
      "extract(EPOCH  from (now() - created_at::timestamp))/3600 as diff"; //for bikesToRents table
  }
  public insertOne(bikeId: number, rent_id: number) {
    //create new Item in bikesToRents
    return this.knex("bikesToRents")
      .insert({ bike_id: bikeId, rent_id })
      .then((newItem) => {
        return this.updareRent(rent_id);
      });
  }

  // bToRntsId = bikesToRents.id
  public deleteOne(bToRntsId: number, rent_id: number) {
    return this.knex("bikesToRents")
      .where("id", bToRntsId)
      .whereNull("end_at")
      .update({ end_at: this.knex.fn.now() })
      .then((res) => {
        return this.updareRent(rent_id);
      });
  }

  private calculateSum(items: Array<{ price: number }>): number {
    return items
      .map((el) => el.price)
      .reduce((prev, current) => prev + current);
  }

  public updareRent(rent_id) {
    let tempItems: Array<Object> = [];
    return this.knex("bikesToRents AS br")
      .select("b.price", this.knex.raw(this.timeDiffQuery))
      .leftJoin("bikes AS b", "b.id", "br.bike_id")
      .where("br.rent_id", rent_id)
      .whereNull("br.end_at")
      .then((items) => {
        if (items.length > 0) {
          const sum = this.calculateSum(items);
          const double_price = items.some((el) => el.diff > 20);
          tempItems = items;
          return this.knex("rent")
            .where("id", 1)
            .first()
            .update({ sum, double_price })
            .returning("*");
        }
        return this.knex("rent")
          .where("id", 1)
          .first()
          .update({ sum: 0 })
          .returning("*");
      })
      .then((rent) => {
        return {
          rent: rent[0],
          items: tempItems,
        };
      });
  }

  public bToRntsItemExists(bToRntsId: number): Promise<boolean> {
    return this.knex("bikesToRents")
      .select("id")
      .where("id", bToRntsId)
      .whereNull("end_at")
      .then((res) => {
        if (res.length > 0) {
          return true;
        }
        return false;
      })
      .catch((e) => e);
  }

  public getById(rentIt: number) {
    let tempItems: Array<Object> = [];
    return (
      this.knex("bikesToRents AS br")
        .select(
          "b.title",
          "b.id AS bike_id",
          "br.id AS bikesToRents_id",
          "b.price",
          "br.created_at",
          "c.title AS category",
          this.knex.raw(this.timeDiffQuery)
        )
        .leftJoin("bikes AS b", "b.id", "br.bike_id")
        .leftJoin("category AS c", "c.id", "b.category_id")
        .where("br.rent_id", rentIt)
        .whereNull("br.end_at")

        //from adn update rent
        .then((items) => {
          //calculate total sum and check double_price
          if (items.length > 0) {
            const sum = this.calculateSum(items);
            const double_price = items.some((el) => el.diff > 20);
            tempItems = items;
            return this.knex("rent")
              .where("id", rentIt)
              .first()
              .update({ sum, double_price })
              .returning("*");
          }
          //if rent dont have items set sum = 0
          return this.knex("rent")
            .where("id", rentIt)
            .first()
            .update({ sum: 0 })
            .returning("*");
        })
        .then((rent) => {
          return {
            rent: rent[0],
            items: tempItems,
          };
        })
    );
  }
}
