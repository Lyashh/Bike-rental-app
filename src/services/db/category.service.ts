import MainDatabaseService from "./main.service";

export default class CategoryService extends MainDatabaseService {
  public findById(id: number) {
    return this.knex("category")
      .where("id", id)
      .then((res) => res)
      .catch((e) => e);
  }
}
