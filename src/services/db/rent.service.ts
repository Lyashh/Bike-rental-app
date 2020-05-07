import MainDatabaseService from "./main.service";

export default class RentService extends MainDatabaseService {
  public insertOne(id: number) {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    return this.knex("bikes")
      .where("id", id)
      .first()
      .then((bike) => {
        return this.knex("rent")
          .insert({
            created_at: this.knex.fn.now(),
            sum: bike.price,
          })
          .returning("*");
      })
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
        "SELECT (extract(EPOCH  from (now() - created_at::timestamp))/360) AS diff, * FROM rent"
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
