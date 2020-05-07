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
    return this.knex("bikes")
      .select("*")
      .then((res) => res)
      .catch((e) => e);
  }

  public insert(newBike: Bike) {
    return this.knex("bikes")
      .insert(newBike)
      .returning("*")
      .then((res) => res)
      .catch((e) => e);
  }

  public findById(id: number) {
    return this.knex("bikes")
      .select("bikes.id", "bikes.title", "rent.id as rent_id")
      .leftJoin("rent", "rent.bike_id", "bikes.id")
      .where("bikes.id", id)
      .then((data) => data)
      .catch((e) => e);
  }

  public deleteById(id: number) {
    return this.knex("bikes")
      .where("id", id)
      .del()
      .then((data) => data)
      .catch((e) => e);
  }

  public whereAvailable(available: boolean) {
    return this.knex("bikes")
      .select("*")
      .where("inRent", !available)
      .then((res) => res)
      .catch((e) => e);
  }

  public InRent() {
    return this.knex("rent")
      .select("bikes.id", "bikes.title")
      .leftJoin("bikes", "rent.bike_id", "bikes.id")
      .then((res) => res)
      .catch((err) => err);
  }

  public available() {
    return this.knex("bikes")
      .select("bikes.id", "bikes.title", "bikes.price", "rent.sum")
      .rightJoin("rent", "rent.bike_id", "!=", "bikes.id")
      .then((res) => res)
      .catch((err) => err);
  }

  public checkInRent(id: number) {
    return this.knex("rent")
      .where("bike_id", id)
      .then((res) => res)
      .catch((err) => err);
  }
}
