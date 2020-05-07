import { Router as ExpressRouter } from "express";
import BikeRouter from "./bike.router";

export default class Router {
  private router: ExpressRouter;
  private bikeRouter: BikeRouter;

  constructor() {
    this.router = ExpressRouter();
    this.bikeRouter = new BikeRouter();
  }

  /**
   *
   *
   * @readonly
   * @type {ExpressRouter}
   * @memberof Router
   */
  public get routes(): ExpressRouter {
    this.router.use("/bikes", this.bikeRouter.routes);
    return this.router;
  }
}
