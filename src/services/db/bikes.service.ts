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
      .where("id", id)
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
}
