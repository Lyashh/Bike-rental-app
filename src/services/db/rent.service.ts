import MainDatabaseService from "./main.service";
import { Bike } from "./bikes.service"

export default class RentService extends MainDatabaseService {
  private timeDiffQuery: string;
  constructor() {
    super();
    this.timeDiffQuery =
      "extract(EPOCH  from (now() - created_at::timestamp))/3600 as diff"; //for bikesToRents table
  }
  public insertOne(bikeId: number): Promise<{sum: number, items: Array<Bike>}> {
    //create new Item in bikesToRents
    return this.knex("bikesToRents")
      .insert({ bike_id: bikeId })
      .then((newItem) => {
        return this.updareRentAndGet();
      });
  }

  // bToRntsId = bikesToRents.id
  public deleteOne(bToRntsId: number): Promise<{sum: number, items: Array<Bike>}> {
    return this.knex("bikesToRents")
      .where("id", bToRntsId)
      .del()
      .then((res) => {
        return this.updareRentAndGet();
      });
  }

  private calculateSum(items: Array<{ price: number }>): number {
    return items
      .map((el) => el.price)
      .reduce((prev, current) => prev + current);
  }

  public updareRentAndGet(): Promise<{sum: number, items: Array<Bike>}> {
    return (
      this.knex("bikesToRents AS br")
        .select(
          "b.title",
          "b.id AS bike_id",
          "br.id AS bikesToRents_id",
          "b.price",
          "c.title AS category",
          this.knex.raw(this.timeDiffQuery)
        )
        .leftJoin("bikes AS b", "b.id", "br.bike_id")
        .leftJoin("category AS c", "c.id", "b.category_id")

        //from adn update rent
        .then((items) => {
          //calculate total sum and check double_price
          let sum = 0;
          if (items.length > 0) {
            items = items.map((bike) => {
              bike.diff = Math.ceil(bike.diff);
              if (bike.diff > 20) {
                bike.price *= 2;
              }
              return bike;
            });
            sum = this.calculateSum(items);
          }
          return { items, sum };
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
