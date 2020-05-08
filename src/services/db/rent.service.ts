import MainDatabaseService from "./main.service";

export default class RentService extends MainDatabaseService {
  public insertOne(bikeId: number) {
    return 
    /*this.knex("bikes")
      .where("id", bikeId)
      .first()
      .then((bike) => {
        return this.knex("rent")
          .insert({
            created_at: this.knex.fn.now(),
          })
          .returning("*");
      })
      .then((rent) => {
        return this.knex("bikesToRents")
          .insert({ bike_id: bikeId, rent_id: rent[0].id })
          .returning("*");
      })
      .then((res) => res)
      .catch((e) => e);*/
  }

  public deleteOne(bikeId: number) {
    return this.knex("bikesToRents")
      .where("bike_id", bikeId)
      .first()
      .del()
      .returning("*")
      .then((del) => {
        console.log({ del });
        console.log();

        return this.knex.raw(
          "SELECT (extract(EPOCH  from (now() - created_at::timestamp))/3600) AS diff, * FROM rent WHERE id=?",
          [del[0].rent_id]
        );
      })
      .then((rent) => {
        let updateData: {
          end_at: string | any;
          double_price: boolean;
          sum: number;
        } = {
          end_at: this.knex.fn.now(),
          double_price: rent.rows[0].double_price,
          sum: rent.rows[0].sum,
        };
        if (rent.rows[0].sum > 20 && rent.rows[0].double_price === false) {
          (updateData.double_price = true), (updateData.sum *= 2);
        }
        return this.knex("rent")
          .where("id", rent.rows[0].id)
          .update(updateData)
          .returning("*");
      })
      .then((updateRent) => updateRent)
      .catch((e) => e);
  }

  private setDoublePrice(ids: Array<number>): void {
    this.knex("rent")
      .where("double_price", false)
      .whereIn("id", ids)
      .update("double_price", true)
      .returning("*")
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  public selectAll() {
    return this.knex
      .raw(
        "SELECT (extract(EPOCH  from (now() - created_at::timestamp))/3600) AS diff, * FROM rent"
      )
      .then((res) => {
        let rentArr: Array<number> = [];
        const rent = res.rows.map((el) => {
          if (!el.double_price && el.diff > 20) {
            el.sum *= 2;
            rentArr.push(el.id);
            return el;
          }
          return el;
        });
        this.setDoublePrice(rentArr);
        return rent;
      })
      .catch((e) => e);
  }
}
