import MainDatabaseService from "./main.service";

export interface Bike {
  id?: number;
  title: string;
  price: number;
  category_id: number;
  category?: string;
  available?: boolean;
  bikesToRents_id?: number;
}

export default class CartService extends MainDatabaseService {
  public selectAll(): Promise<Array<Bike>> {
    return this.knex("bikes").select("*").orderBy("id");
  }

  public insert(newBike: Bike): Promise<Bike> {
    let createdBike: Bike;
    return this.knex("bikes")
      .insert(newBike)
      .returning("*")
      .then((newBike) => {
        createdBike = newBike[0];
        return this.knex("category").where(
          "id",
          Number.parseInt(newBike[0].category_id)
        );
      })
      .then((category) => {
        createdBike.category = category[0].title;
        return createdBike;
      })
      .catch((e) => e);
  }

  public updateToNotAvailable(id: number): Promise<number> {
    return this.knex("bikes").where("id", id).update({ available: false });
  }

  public whereAvailable(available: boolean): Promise<Array<Bike>> {
    return this.knex("bikes").select("*").where("inRent", !available);
  }

  public InRent(): Promise<Array<Bike>> {
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

  public findById(id: number): Promise<Array<Bike>> {
    return this.knex("bikes AS b")
      .select("b.id", "b.title", "br.id as bikesToRents_id", "b.available")
      .leftJoin("bikesToRents AS br", "br.bike_id", "b.id")
      .where("b.id", id);
  }

  public available(): Promise<Array<Bike>> {
    return this.knex("bikes AS b")
      .select("b.id", "b.title", "b.price", "c.title AS category")
      .leftJoin("bikesToRents AS br", "br.bike_id", "b.id")
      .leftJoin("category AS c", "c.id", "b.category_id")
      .whereNull("br.id")
      .andWhere("b.available", true)
      .orderBy("id");
  }

  public bikesCatgs(): Promise<Array<{ id: number; title: string }>> {
    return this.knex("category").select("*");
  }
}
