import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import doenv from "dotenv";
import path from "path";

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

    // check connection to db
    let connectTry = async (retries) => {
      await new Promise((resp) => setTimeout(resp, 5000));
      while (retries) {
        let test = await knex
          .raw('SET timezone="UTC";')
          .then(() => {
            console.log("SUCCESS CONNECTION DO DATABASE");
            return true;
          })
          .catch((err) => {
            console.error({
              retry: retries,
              db_user: process.env.POSTGRES_USER,
              message: "Database failed to connect",
              error: err,
            });
            return false;
          });
        if (test) {
          break;
          console.log("Success connection to confirm");
        } else {
          if (retries == 1) {
            throw new Error("Database failed to connect");
          }
          retries -= 1;
          await new Promise((resp) => setTimeout(resp, 5000));
        }
      }
    };
    connectTry(6);
    this.config();
  }

  private config(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    this.expressApp.use(
      cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" })
    );
    this.expressApp.use(express.static(__dirname + "/static"));

    this.expressApp.set("port", process.env.PORT || 4000);
    this.expressApp.use("/api/", this.router.routes);

    this.expressApp.use(
      "/",
      express.static(path.join(__dirname, "../", "client", "build"))
    );

    this.expressApp.get("/", (req, res) => {
      return res.sendFile(
        path.resolve(__dirname, "../", "client", "build", "index.html")
      );
    });

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
