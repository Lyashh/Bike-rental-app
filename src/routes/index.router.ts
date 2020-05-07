import { Router as ExpressRouter } from "express";
import BikeRouter from "./bike.router";
import RentRouter from "./rent.router";

export default class Router {
  private router: ExpressRouter;
  private bikeRouter: BikeRouter;
  private rentRouter: RentRouter;

  constructor() {
    this.router = ExpressRouter();
    this.bikeRouter = new BikeRouter();
    this.rentRouter = new RentRouter();
  }

  /**
   *
   *
   * @readonly
   * @type {ExpressRouter}
   * @memberof Router
   */
  public get routes(): ExpressRouter {
    this.router.use("/rent", this.rentRouter.routes);
    this.router.use("/bikes", this.bikeRouter.routes);
    return this.router;
  }
}
