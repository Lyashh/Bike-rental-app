import Knex from "knex";
import DB from "../../database/connection";

export default abstract class MainDatabaseService {
  private connection: Knex;
  constructor() {
    this.connection = DB.getInstance.getConnection;
  }

  public get knex() {
    return this.connection;
  }
}
