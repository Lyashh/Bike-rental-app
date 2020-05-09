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
        return this.updareRentAndGet(rent_id);
      });
  }

  // bToRntsId = bikesToRents.id
  public deleteOne(bToRntsId: number, rent_id: number) {
    return this.knex("bikesToRents")
      .where("id", bToRntsId)
      .andWhere("rent_id", rent_id)
      .del()
      .then((res) => {
        return this.updareRentAndGet(rent_id);
      });
  }

  private calculateSum(items: Array<{ price: number }>): number {
    return items
      .map((el) => el.price)
      .reduce((prev, current) => prev + current);
  }

  public updareRentAndGet(rentIt: number) {
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

        //from adn update rent
        .then((items) => {
          //calculate total sum and check double_price
          let sum = 0;
          if (items.length > 0) {
            sum = this.calculateSum(items);
            const double_price = items.some((el) => el.diff > 20);
            if (double_price) {
              sum *= 2;
            }
          }

          tempItems = items;
          return this.knex("rent")
            .where("id", rentIt)
            .first()
            .update({ sum })
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

  public bToRntsItemExists(bToRntsId: number): Promise<boolean> {
    return this.knex("bikesToRents")
      .select("id")
      .where("id", bToRntsId)
      .then((res) => {
        if (res.length > 0) {
          return true;
        }
        return false;
      })
      .catch((e) => e);
  }
}
