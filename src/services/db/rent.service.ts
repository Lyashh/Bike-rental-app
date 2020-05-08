import MainDatabaseService from "./main.service";

export default class RentService extends MainDatabaseService {
  public insertOne(bikeId: number) {
    //create new Item in bikesToRents
    return this.knex("bikesToRents")
      .insert({ bike_id: bikeId, rent_id: 1 })
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

  public updareRent() {
    return (
      this.knex("bikesToRents")
        .select(
          "bikes.id AS bikes_id",
          "bikes.price",
          "bikesToRents.id AS bikesToRents_id",
          this.knex.raw(
            "extract(EPOCH  from (now() - created_at::timestamp))/3600 as diff"
          )
        )
        .leftJoin("bikes", "bikes.id", "bikesToRents.bike_id")
        .where("bikesToRents.rent_id", 1)
        .whereNull("bikesToRents.end_at")

        //calculate total sum and doble_check
        .then((rentBikes) => {
          const sum = rentBikes
            .map((el) => el.price)
            .reduce((prev, current) => prev + current);
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
        } else {
          return false;
        }
      })
      .catch((e) => e);
  }
}
