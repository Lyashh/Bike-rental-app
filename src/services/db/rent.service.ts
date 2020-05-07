import MainDatabaseService from "./main.service";

export default class RentService extends MainDatabaseService {
  public insertOne(id: number) {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    return this.knex("bikes")
      .where("id", id)
      .first()
      .then((res) => res)
      .catch((e) => e);
  }
}
