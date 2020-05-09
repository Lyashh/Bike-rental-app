import MainDatabaseService from "./main.service";

export interface Bike {
  id?: number;
  title: string;
  price: number;
  inRent: boolean;
  category_id: number;
  rent_id: number | null;
}

export default class CartService extends MainDatabaseService {
  public selectAll(): Promise<Array<Bike>> {
    return this.knex("bikes").select("*");
  }

  public insert(newBike: Bike) {
    return this.knex("bikes").insert(newBike).returning("*");
  }

  public deleteById(id: number) {
    return this.knex("bikes").where("id", id).del();
  }

  public whereAvailable(available: boolean) {
    return this.knex("bikes").select("*").where("inRent", !available);
  }

  public InRent() {
    return this.knex("bikesToRents AS br")
      .select(
        "b.id",
        "b.title",
        "b.price",
        "br.id AS bikesToRents_id",
        "c.title AS category"
      )
      .leftJoin("bikes AS b", "br.bike_id", "b.id")
      .leftJoin("category AS c", "c.id", "b.category_id");
  }

  public oneInRent(bikeId: number): Promise<boolean> {
    return this.knex("bikesToRents")
      .select("bikes.id", "bikes.title")
      .leftJoin("bikes", "bikesToRents.bike_id", "bikes.id")
      .where("bikes.id", bikeId)
      .then((res) => {
        if (res.length > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => err);
  }

  public findById(id: number) {
    return this.knex("bikes")
      .select("bikes.id", "bikes.title", "bikesToRents.id as bikesToRents_id")
      .leftJoin("bikesToRents", "bikesToRents.bike_id", "bikes.id")
      .where("bikes.id", id);
  }

  public available() {
    return this.knex("bikes AS b")
      .select("b.id", "b.title", "b.price", "c.title AS category")
      .leftJoin("bikesToRents AS br", "br.bike_id", "b.id")
      .leftJoin("category AS c", "c.id", "b.category_id")
      .whereNull("br.id")
      .orderBy("id");
  }
}
