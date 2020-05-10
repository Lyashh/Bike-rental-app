import MainDatabaseService from "./main.service";

export default class CategoryService extends MainDatabaseService {
  public findById(id: number): Promise<Array<{ id: number; title: string }>> {
    return this.knex("category").where("id", id);
  }
}
