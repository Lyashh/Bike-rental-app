import Knex from "knex";
import Config from "../knexfile";

export default class Connection {
  private static instance: Connection;
  private connection: Knex;

  private constructor() {
    this.connection = Knex(Config);
  }

  public get getConnection(): Knex {
    return this.connection;
  }

  public static get getInstance(): Connection {
    const instance = this.instance || (this.instance = new this());
    return instance;
  }
}
