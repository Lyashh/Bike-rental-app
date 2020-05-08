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
        return this.updareRent();
      });
  }

  // bToRntsId = bikesToRents.id
  public deleteOne(bToRntsId: number) {
    return this.knex("bikesToRents")
      .where("id", bToRntsId)
      .whereNull("end_at")
      .update({ end_at: this.knex.fn.now() })
      .then((res) => {
        return this.updareRent();
      });
  }

  private calculateSum(items: Array<{ price: number }>): number {
    return items
      .map((el) => el.price)
      .reduce((prev, current) => prev + current);
  }

  public updareRent() {
    return (
      this.knex("bikesToRents AS br")
        .select("b.price", this.knex.raw(this.timeDiffQuery))
        .leftJoin("bikes AS b", "b.id", "br.bike_id")
        .where("br.rent_id", 1)
        .whereNull("br.end_at")
        //calculate total sum and doble_check
        .then((rentBikes) => {
          const sum = this.calculateSum(rentBikes);
          const double_price = rentBikes.some((el) => el.diff > 20);

          //return updated rend
          return this.knex("rent")
            .where("id", 1)
            .update({ sum, double_price })
            .returning("*");
        })
    );
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
    return this.knex("bikesToRents AS br")
      .select(
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

      .then((items) => {
        const sum = this.calculateSum(items);
        const double_price = items.some((el) => el.diff > 20);
        tempItems = items;
        return this.knex("rent")
          .where("id", rentIt)
          .update({ sum, double_price })
          .returning("*");
      })
      .then((rent) => {
        return {
          rent,
          items: tempItems,
        };
      });
  }
}
