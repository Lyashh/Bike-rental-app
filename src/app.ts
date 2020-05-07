import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import doenv from "dotenv";

import DB from "./database/connection";
import Router from "./routes/index.router";

doenv.config();
const knex = DB.getInstance.getConnection;

class App {
  private static app: App;
  private expressApp: express.Application;
  private router: Router;

  private constructor() {
    this.expressApp = express();
    this.router = new Router();
    this.config();

    // check connection to db
    knex
      .raw('SET timezone="UTC";')
      .then(() => console.log("Success connection to Database"))
      .catch((err) => {
        console.error({
          message: "Database failed to connect",
          error: err,
        });
        throw new Error("Database failed to connect");
      });
  }

  private config(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    this.expressApp.use(
      cors({ credentials: true, origin: process.env.CORS_ORIGIN })
    );
    this.expressApp.use(express.static(__dirname + "/static"));

    this.expressApp.set("port", process.env.PORT || 4000);
    this.expressApp.use(`/api/${process.env}/`, this.router.routes);

    // 404
    this.expressApp.use((req, res, next) => {
      res.status(404);
      return res.json({ error: `Not found${req.originalUrl}` });
    });
  }

  public init(): void {
    this.expressApp.listen(this.expressApp.get("port"), () => {
      console.log(`SERVER RUN ON PORT ${this.expressApp.get("port")}`);
    });
  }

  public static get getInstance(): App {
    const app: App = this.app || (this.app = new this());
    return app;
  }
}

const server = App.getInstance;
server.init();
